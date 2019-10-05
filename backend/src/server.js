const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')


const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' })); // parser to read the port data

function write() //for writing
{
    port.on('data', function () 
    {
        port.write("switchon");
    });
}

function read () // for reading
{
    parser.on('data', function(data)
    {
        console.log(data); 
    });
}

port.on('open', function() 
{
    write(); 
    read(); 
});

