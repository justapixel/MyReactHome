let connection = null;

class UpdateAll {
    constructor() {
        this._socket = null;
    }
    connect(server) {
        const io = require('socket.io')(server);
        io.on('connection', (socket) => {
            this._socket = socket; 
            this._socket.on('statusConnetion',(data)=>{
                console.log(data)
            });

            this._socket.on('disconnect', function () {
                console.log(socket.id,"Socket as disconnected");
            });

            console.log(`New socket connection: ${socket.id}`);
        });
    }

    sendEvent(event, data) {
        this._socket.emit(event, data);
    }

    registerEvent(event, handler) {
        this._socket.on(event, handler);
    }

    static init(server,sessionMiddleware) {
        if(!connection) {
            connection = new UpdateAll();
            connection.connect(server,sessionMiddleware);
        }
    }

    static getConnection() {
        if(!connection) {
            throw new Error("no active connection");
        }
        return connection;
    }
}

module.exports = {
    connect: UpdateAll.init,
    connection: UpdateAll.getConnection 
}