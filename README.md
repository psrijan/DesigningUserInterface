# HW1: Drexel Bikes

This project introduces the concept of server client architecture in the web. It uses a simple json file to send out data using REST endpoints. The UI consumes these APIs to display data in a dynamic way.

## Run Drexel Bikes
    > pip install -r ./hw1/requirements.txt
    > python3 run.py

## Results: 

![Drexel Bikes](./results/bike_1_detail.png)

#HW2: Drexel Bikes

This is a Flask, Javascript based project to book bicycles off the internet. This is a continuation of Drexel Bikes Static and adds a database to the previous project. With this extension, the Drexel Bike App can have dynamic information and storage ability. 

The intuition of the project is to introduce persistence into web app. This project made me further solidfy how data is accessed over the internet and how persistent changes are made over the web.

## Run Persistent Drexel Bikes 
    > pip install -r ./hw2/requirements.txt
    > python3 run.py


## Results:
![Bike Main](./results/bike_main.png)

![Bike List](./results/bike_list.png)



# HW3: Function Grapher

This is a canvas based html application that is used to draw polynomial graphs. The application allows you to draw graphs of upto order 3, dynamically modify the graph when coeffs of the graph change and identify coordinates of points when user hovers over any x coordinate of the graph.

## Run Function Grapher
    > ./hw3/index.html


## Result:

![Linear Graph](./results/linear.png)


![Polynomial Graph with Dregree 2](./results/degree2.png)


![Polynomial Graph with Degree 3](./results/degree3.png)


# HW4: Charity Searcher

This is a text based search engine for finding your choice of charity to donate to. Use the searchbar to find the charities in the database that match the charity that contains searched text. The project uses `whoosh` python library to do the text search. Overall there are 4 RESTApis for the project. There are 4 REST Apis in this project: 2 that render the view and 2 that return search `json` data. One interesting feature of the project is that, your view highlights the text that matches your search query. 

The intuition of the project is to get acquanited with how something like text search works on the web.
your search query, to make it easy how you got the results.

## Run Charity Searcher
    > pip install -r ./hw4/requirements.txt
    > python3 run.py

# Result:
![Charity Main Page](./results/charity_main.png)

![Charity Details Page](./results/charity_details.png)

![Charity Search Highlight](./results/charity_extra.png)

 
    
