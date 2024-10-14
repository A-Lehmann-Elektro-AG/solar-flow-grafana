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
8. Create a new data source and provide the queries for the solar panel production data. Or create a grafana test data source