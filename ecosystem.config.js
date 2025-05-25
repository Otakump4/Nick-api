module.exports = {
apps: [{
name: "lucas-fonts",
script: "index.js",
instances: "max",
env: {
NODE_ENV: "production",
PORT: 4000
},
error_file: "logs/err.log",
out_file: "logs/out.log",
merge_logs: true,
log_date_format: "YYYY-MM-DD HH:mm:ss"
}]
};