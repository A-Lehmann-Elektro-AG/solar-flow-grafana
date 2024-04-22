# Solar Flow Visualisation

Solar Flow is a simple animated visualization of solar panel production flow, designed to be displayed as a plugin on a Grafana dashboard.

## Installation

1. Add the Solar Flow plugin to your Grafana dashboard
2. Create a data source of your solar panel production data (Watch the example queries below
3. Provide the queries for PV and Grid data entries
4. Adjust the panel settings to your needs and observe your solar Production/Consumption/Waste ratio on your dashboard

## Data Source Queries/Requirements
In the example below, following queries are used to display the solar panel production flow in our case:
### Grid Query:
```sql
 from(bucket: "your-bucket")
  |> range(start: -5m)
  |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
  |> group()
  |> aggregateWindow(every: 5m, fn: sum, createEmpty: false)
  |> last()
  ```
### PV Query:
```sql
from(bucket: "your-bucket")
  |> range(start: -5m)
  |> mean()
  ```
As you can see we use the last 5 minutes of data to display the current state of the solar panel production flow.
Make sure there's only one entry for each query, otherwise the plugin will not work as expected.

>[!NOTE]
> The queries are written in Flux language, which is used by InfluxDB. You can use any other query language that is supported by your data source. 

## Final Result (example):
![example.gif](example.gif)


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### Development Environment Setup

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run build` to build the plugin
4. Run `sudo docker compose up` to start the development environment
5. Run `sudo npm run dev` to start the actual plugin simultaneously
6. Open `http://localhost:3000` in your browser and login with the default credentials (admin:admin)
7. Add a new dashboard and add the Solar Flow plugin to it