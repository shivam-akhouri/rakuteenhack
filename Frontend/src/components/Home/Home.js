import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import {auth, db} from "../../firebase";
import {Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/channelSlice";
import {useAuthState} from "react-firebase-hooks/auth";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Card from "../UI/Card/Card";
// import firebase from "firebase";
import {useCollection} from "react-firebase-hooks/firestore";
import Banner from "../UI/Banner/Banner";
import Chat from "../Chat/Chat";
import {PaperAirplaneIcon, PaperClipIcon} from "@heroicons/react/outline";
import { useRef } from "react";
import { addDoc, collection, query } from 'firebase/firestore/lite';
import { doc, getDoc,getDocs, onSnapshot} from 'firebase/firestore';

const Home = () => {
    // const [user] = useAuthState(auth);
    // // for displaying through firebase
    // const channelId = useSelector(selectChannelId);
    // const channelName = useSelector(selectChannelName);
    const [message, setMessage] = useState("")
    const [group, setGroups] = useState(null);
    const [messages, setMessages] = useState(null);
    const [profiles, setProfiles] = useState(null);
    const [user1, setUser1] = useState("user1")
    const [user2, setUser2] = useState("user2");

    const q1 = query(collection(db, `message/${user1}/${user2}`));
    const q2 = query(collection(db, `message/${user2}/${user1}`));
    function handleSubmit(){
        addDoc(q1, {
            text: message,
            sender: "user1",
            receiver: "user2",
            createdAt: new Date()
        }).then(val=>setMessage(""))
        addDoc(q2, {
            text: message,
            sender: "user1",
            receiver: "user2",
            createdAt: new Date()
        }).then(val=>setMessage(""))
    }
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/getUsers/finance")
        .then(res=>res.json())
        .then(res=>setProfiles(res.data))
    }, [])
    useEffect(()=>{
        const d = doc(db, "groups", "FfYxJCE4oNewVXzZbkoz")
        getDoc(d)
        .then(res=>{
            let data = res.data()
            data = Object.entries(data);    
            // console.log(data)
            setGroups(data)
        })
    }, [])
    useEffect(()=>{
        const unsubscribe = onSnapshot(query(collection(db, `message/${user1}/${user2}`)), snapshot=>{
            setMessages(snapshot.docs.map(data =>data.data()));
        })
    }, [])

    return (
        <>
            <Header/>
            <div className="home__section h-[91vh] overflow-hidden pt-3">


                <div className="flex">
                    <div className="flex flex-col gap-5">
                        <Card className="card py-6 ml-5 w-[20rem]">

                    <span className="subheading px-6">
                        Chat
                    </span>
                            <hr/>
                            <div className="h-[20vh] flex-grow overflow-y-scroll">
                                {profiles && profiles.map(val=>(
                                    <div onClick={()=>{
                                        setUser2(val.email)
                                        getDocs(query(collection(db, `message/${user1}/${val.email}`)))
                                        .then(res=>setMessages(res.docs.map(doc=>doc.data())));
                                    }}>
                                        <Profile type="square" name={val.first_name+" "+val.last_name}/>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="card py-6 ml-5 w-[20rem]">
                    <span className="subheading px-6">
                        Circles
                    </span>
                            <hr/>
                            <div className="h-[42vh] flex-grow overflow-y-scroll">
                                {
                                    group && group.map(val=>(
                                        <div onClick={()=>{
                                            setUser2(val[0])
                                            setTimeout(()=>{
                                            getDocs(query(collection(db, `message/${user1}/${val[0]}`)))
                                            .then(res=>{
                                                // console.log(res.docs)
                                                setMessages(res.docs.map(doc=>doc.data()))
                                            });
                                            }, 100)
                                        }}>
                                            <Profile type="rounded-full" name={val[0]} />
                                        </div>
                                    ))
                                }
                                {/* <Profile type="rounded-full" name="Automobile Insurance"/>
                                <Profile type="rounded-full" name="Home Insurance"/>
                                <Profile type="rounded-full" name="Travel Insurance"/>
                                <Profile type="rounded-full" name="Home Loan"/>
                                <Profile type="rounded-full" name="Car Loan"/>
                                <Profile type="rounded-full" name="EMI"/> */}
                            </div>

                            {/*for displaying through firebase*/}
                            {/*{channels?.docs.map((doc)=>(*/}
                            {/*    <Channel key={doc.id} id={doc.id} channelName={}/>*/}
                            {/*))}*/}

                        </Card>
                    </div>
                    <div className="flex px-5">

                        <Card className="absolute card flex flex-col overflow-y-auto pb-6 h-[88vh] w-[156vh]">

                            <Banner heading={user2}/>

                                <div
                                    className="sticky top-5 bottom-20 chat__input-section flex items-center p-2.5 mx-8
                                    mb-4">

                                    <PaperClipIcon className="h-10 mr-5 text-[#72767d]"/>

                                    <div className="flex items-center chat__input w-full">
                                        <input type="text" placeholder="Search"
                                               className="focus:outline-none w-full bg-transparent p-4"
                                               value={message} onChange={(e)=>setMessage(e.target.value)}
                                        />
                                        <button type="submit" onClick={handleSubmit}>
                                            <PaperAirplaneIcon className="h-10 text-[#72767d] mr-1 rotate-90"/>
                                        </button>

                                    </div>
                                </div>
                            <div className="flex flex-col gap-2">
                                {messages != null && messages.map(({text, sender})=>(
                                        <Chat text={text} isUser={"user1" == sender}/>
                                ))}
                            </div>
                           
                        </Card>
                       
                    </div>
                </div>
                
                
            </div>
        </>
    );
};

export default Home;