export const corsConfig = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,POST,DELETE", // Allow all methods
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
