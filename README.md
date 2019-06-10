## Personal Stock Page
Let's build a customizable stock webpage!  Attach your own news to whatever stock you like!
![alt text](https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/highlight.PNG)

## Motivation
Who can remember what event happend an year ago that made <em> stock XXX </em> rise over 500%?  If you can not, you came to the right place!

Here, I am in the progress of development a front-end GUI, which allows you to remember what happened an year ago with <em> stock XXX </em> and beyond.

You are in control.  You can pick the stock charts you want and add whatever news you want to the chart!

## How to install
1. Download the repo from [GitHub](https://github.com/richardl911/personal-stock-page.git)
2. Navigate to the [web](./web/) directory
3. Click on [index.html](./web/index.html) to start the GUI
    * Designed/tested with Google Chrome

## Missing Features
- Alert feature for invalid stock symbol
    + Currently, invalid stock symbol error is displayed in console window
- Help menu


## How to use
Hopefully, it is self-explanatory, but if not, here is a quick run through of this GUI capability.

### Main menu
As of now, there are only two functional submenus.  The next two coming up will be saving/loading.
![alt text](https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/menu.PNG)

### Submenus
The two functionality submenu as of now are the following :

#### Create Stock
- Used to find stock data by using [iextrading](https://iextrading.com) API
- FYI : If chart does not show, scroll down the page, the chart should be there.
![alt text](https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/createChart.PNG)

#### Add News To Chart
- Used to add your news to stock chart.<br>
- <strong> Click on chart first to get control of this submenu </strong>
![alt text](https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/addNews.PNG)

#### Save
- Type in a desired file name to save all annotations and charts
- File will be most likely be saved to your download directory
![alt text](https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/save.PNG)

#### Load
- Use this submenu to load previous annotations/charts into the GUI
- Loading will not erase current charts or annotations that has different dates
    + ie. An annotation with date 2019/06/10 already in the chart will get overriden with one loaded from 2019/06/10.  However, one with different dates (2014/10/21), will not be overriden

![alt test](https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/load.PNG)

## Chart's Ability
- Resizable
- Draggable
- See more indepth detail of the annotation, click on the desired annotation and then the '+' on the left of "News Contents" for the summary and reference site
![alt text](https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/chart.PNG)

## Future Updates
In future updates, some of these features below might be added.
- Better placement of annotation
- Dropdown for hidden charts
    - Currently, to see hideen charts, the stock symbol must be created again
- Better organization of charts such as grouping/tabbing
- Ability to add news to all charts or selected ones
