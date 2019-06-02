## Personal Stock Page
Let's build a customizable stock webpage!  Attach your own news to whatever stock you like!

<p align="center">
  <img src="./images/highlight.png" alt="https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/highlight.PNG" style="border:2px solid black">
</p>

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
- Ability to save/load annotated news (coming soon)
- Alert feature for invalid stock symbol
    + Currently, invalid stock symbol error is displayed in console window
- Help menu


## How to use
Hopefully, it is self-explanatory, but if not, here is a quick run through of this GUI capability.

### Main menu
As of now, there are only two functional submenus.  The next two coming up will be saving/loading.
<p align="center">
  <img src="./images/menu.png" alt="https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/menu.PNG" style="border:2px solid black">
<p>

### Submenus
The two functionality submenu as of now are the following :

#### Create Stock
- Used to find stock data by using [iextrading](https://iextrading.com) API
- FYI : If chart does not show, scroll down the page, the chart should be there.
<p align="center">
  <img src="./images/createChart.png" alt="https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/createChart.PNG" style="border:2px solid black">
</p>

#### Add News To Chart
- Used to add your news to stock chart.<br>
- <strong> Click on chart first to get control of this submenu </strong>
<p align="center">
  <img src="./images/addNews.png" style="border:2px solid black">
</p>

## Chart's Ability
- Resizable
- Draggable
- See more indepth detail of the annotation by clicking on the annotation
<p align="center">
  <img src="./images/chart.png" alt="https://raw.githubusercontent.com/richardl911/personal-stock-page/master/images/chart.PNG" style="border:2px solid black">
</p>

## Future Updates
In future updates, some of these features below might be added.
- Better placement of annotation
- Dropdown for hidden charts
    - Currently, to see hideen charts, the stock symbol must be created again
- Better organization of charts such as grouping/tabbing
- Ability to add news to all charts or selected ones
