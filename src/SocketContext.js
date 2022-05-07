import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

//const socket = io("https://dymenxion-webcam-chat.herokuapp.com/");
const socket = io("http://localhost:5001");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [lifeTotal, setLifeTotal] = useState(40);
  const [oppLifeTotal, setOppLifeTotal] = useState(40);
  const [myRoom, setMyRoom] = useState("");
  const [queueUI, setQueueUI] = useState(false);
  const [joinGame, setJoinGame] = useState(false);
  const [oppID, setOppID] = useState("");
  const [oppName, setOppName] = useState("Opponent");
  const [rating, setRating] = useState(1500);
  const [users, setUsers] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rotate, setRotate] = useState(false);
  const [oppRotate, setOppRotate] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((currentStream) => {
    //     setStream(currentStream);

    //     myVideo.current.srcObject = currentStream;
    //   });

    socket.on("me", (id) => setMe(id));

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
      setOppID(from);
    });
  }, []);

  // receiving and storing room data // is this even needed?
  socket.on("roommake", (data) => {
    setMyRoom(data);
    //console.log(`I should be in room No.${data}`)
  });

  socket.on("updateusers", (clientNo) => {
    setUsers(clientNo);
  });

  socket.on("callended", () => {
    setCallEnded(true);
    connectionRef.current.destroy();

    window.location.reload();
  });

  socket.on("disableui", () => {
    //console.log("I am going to disable the UI.")
    //setQueueUI(true)
  });

  socket.on("enableui", () => {
    //console.log("I am going to enable the UI");
    setQueueUI(false);
  });

  // setting the opponents details
  socket.on("setoppdetails", (opponent) => {
    setOppID(opponent.id);
    setOppName(opponent.name);
  });

  const answerCall = () => {
    setCallAccepted(true);
    setQueueUI(false);
    setJoinGame(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setOppID(id);

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit("leavecall", { me, oppID });
  };

  // Queue Functionality

  const queueCC = (id) => {
    setQueueUI(true);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    let myRoomToQueue = myRoom;
    let user = name;

    peer.on("signal", (data) => {
      const tryQueueCC = () => {
        socket.emit(
          "queuecc",
          {
            id,
            myRoomToQueue,
            signalData: data,
            user,
            rating,
          },
          (response) => {
            if (response === "Adding you to queue") {
              console.log("added");
              clearInterval(newIntervalId);
            } else if (response === "You're already in the queue") {
              console.log("clearing interval");
              clearInterval(newIntervalId);
            }
          }
        );
      };
      tryQueueCC();
      const newIntervalId = setInterval(tryQueueCC, 1000);
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const queueBlitz = (id) => {
    setQueueUI(true);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    let myRoomToQueue = myRoom;
    let user = name;

    peer.on("signal", (data) => {
      const tryQueueBlitz = () => {
        socket.emit(
          "queueblitz",
          {
            id,
            myRoomToQueue,
            signalData: data,
            user,
            rating,
          },
          (response) => {
            if (response === "Adding you to queue") {
              console.log("added");
              clearInterval(newIntervalId);
            } else if (response === "You're already in the queue") {
              console.log("clearing interval");
              clearInterval(newIntervalId);
            }
          }
        );
      };
      tryQueueBlitz();
      const newIntervalId = setInterval(tryQueueBlitz, 1000);
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveQueue = () => {
    setQueueUI(false);
    socket.emit("leavequeue", me);
  };

  const checkServerQueue = () => {
    socket.emit("checkthequeue");
  };

  // FUNCTIONALITY FOR THE LIFE TRACKER

  // Send player life
  const sendLife = (newValue) => {
    socket.emit("mylifetotal", { newValue, oppID });
  };

  // receive life
  socket.on("opponentslife", (newValue) => {
    setOppLifeTotal(newValue);
  });

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        setStream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        queueCC,
        queueBlitz,
        lifeTotal,
        setLifeTotal,
        oppLifeTotal,
        setOppLifeTotal,
        oppName,
        setOppName,
        sendLife,
        checkServerQueue,
        queueUI,
        setQueueUI,
        joinGame,
        setJoinGame,
        leaveQueue,
        rating,
        users,
        email,
        setEmail,
        message,
        setMessage,
        rotate,
        setRotate,
        oppRotate,
        setOppRotate,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
