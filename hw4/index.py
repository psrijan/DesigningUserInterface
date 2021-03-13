# Copyright Dario Salvucci, salvucci@drexel.edu
# All code written in this file is the work of 
# Dario. Dario, is a CS professor at Drexel University.

import os
import re

import whoosh.fields as wf
import whoosh.index as wi
import whoosh.qparser as wqp
import whoosh.query as wq


class Index:
    '''
    Search index based on the Whoosh library

    This class provides a simple search index that stores data provides search
    functionality over the data. Internally, the class uses the Whoosh library
    and most of its standard parsing and ranking algorithms.
    '''

    def __init__(self, path):
        '''
        Initializes the index and opens the index directory if it exists.
        '''
        self.path = path
        try:
            self.index = wi.open_dir(self.path)
        except Exception:
            self.index = None

    def is_empty(self):
        '''
        Returns True if the index directory does not yet exist.
        If it does not exist, it should be populated before use.
        '''
        return self.index is None

    def populate(self, items, text_fields):
        '''
        Populates the index with the given items.

        items: a list of items where each item is represented as a dictionary
        text_fields: a list of the searchable text fields in the items

        Example:
        index.populate([
            {'uid': 1, 'name': 'ABC', 'description': 'ABC is good'},
            {'uid': 2, 'name': 'DEF', 'description': 'DEF is great'},
        ], ['description'])
        '''

        fields = {}
        for field in items[0]:
            if field in text_fields:
                fields[field] = wf.TEXT(stored=True)
            elif isinstance(items[0][field], str):
                fields[field] = wf.ID(stored=True)
            else:
                fields[field] = wf.NUMERIC(stored=True)

        schema = wf.Schema(**fields)

        os.makedirs(self.path, exist_ok=True)

        self.index = wi.create_in(self.path, schema)

        writer = self.index.writer()
        for item in items:
            writer.add_document(**item)
        writer.commit()

    def get(self, **kwargs):
        '''
        Gets and returns a specific item matching the arguments

        kwargs: a set of field-value arguments

        Example:
        item = index.get(uid=3)
        '''
        with self.index.searcher() as searcher:
            hit = searcher.document(**kwargs)
            return dict(hit)

    def search(self, query, field, n=10, join='and', avoid=None):
        '''
        Searches the index for items matching the query and
        returns the matching items sorted with best matches first.

        query: the query string to search for
        field: the text field to search within
        n: the maximum number of items to return
        join: method used to join search terms, 'and' or 'or'
        avoid: a dictionary of field-value pairs indicating items to avoid

        Example:
        items = index.search('great', 'description', avoid={'uid': 1})
        '''
        query = query.lower()
        query = re.sub(r'[^a-z ]', ' ', query)
        query = re.sub(r'\s+', ' ', query)
        group = wqp.OrGroup if join == 'or' else wqp.AndGroup
        qparser = wqp.QueryParser(field, schema=self.index.schema, group=group)
        q = qparser.parse(query)

        mask = None
        if avoid:
            terms = []
            for key, value in avoid.items():
                terms.append(wq.Term(key, value))
            mask = wq.And(terms)

        with self.index.searcher() as searcher:
            results = searcher.search(q, mask=mask, limit=n)
            items = []
            for hit in results[0:n]:
                item = dict(hit)
                item['_score'] = hit.score
                items.append(item)
            return items
