// config/env.config.js
// env config
import "dotenv/config";

// processes environment variables with placeholders
const processEnvVariables = (envVar) => {
    return envVar.replace(/\${([^}]+)}/g, (_, varName) => process.env[varName]);
};

// replace placeholders in the database url
process.env.DATABASE_URL = processEnvVariables(process.env.DATABASE_URL);

export default process.env;
