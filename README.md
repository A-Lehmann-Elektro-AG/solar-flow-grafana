# Solar Flow Visualisation

Solar-Flow is a simple visualization of solar panel production flow, designed to be displayed as a plugin on a Grafana dashboard.

## Installation

1. Add the solar-flow plugin to your Grafana dashboard
2. Create a data source of your solar panel production data
3. Provide the queries for PV and Grid data entries
4. Adjust the panel settings to your needs and observe your solar Production/Consumption/Waste ratio on your dashboard

## Query Example
In the demo below, following queries are used to display the solar panel production flow:
### Grid Query:
```sql
 from(bucket: "ems")
  |> range(start: -5m)
  |> filter(fn: (r) => r["tags_4"] == "19026" or r["tags_4"] == "15")
  |> filter(fn: (r) => r["tags_2"] == "Janitza UMG96RM")
  |> filter(fn: (r) => r["tags_1"] == "smartmeter")
  |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
  |> group()
  |> aggregateWindow(every: 5m, fn: sum, createEmpty: false)
  |> last()
  ```
### PV Query:
```sql
from(bucket: "ems")
  |> range(start: -5m)
  |> filter(fn: (r) => r["tags_1"] == "solar")
  |> filter(fn: (r) => r["tags_2"] == "SMA Data Manager")
  |> filter(fn: (r) => r["tags_3"] == "pv-feed-in-30775")
  |> mean()
  ```

## Demo:
![demo.gif](demo.gif)
