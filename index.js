const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const commandLineArgs = require('command-line-args');
const config = require('config');
console.log('Hello World '+config.get('server.port'));