import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import Card from "../UI/Card/Card";
import Profile from "../Profile/Profile";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ComputerIcon from '@mui/icons-material/Computer';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Loader from "../UI/Loader/Loader"
import { Icon } from '@iconify/react';
import skull from '../Assets/toxic (1).png'
import heart from '../Assets/love (1).png'
import car from '../Assets/toy-car.png'
import home from '../Assets/home.png'
import Banner from "../UI/Banner/Banner";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/outline";
import './Dashboard.css';
import { ChatBot } from "../UI/ChatBot/ChatBot"
import {
    PieChart,
    Pie,
    Legend,
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Cell
} from "recharts";
import { width } from '@mui/system';

const Dashboard = () => {
    // const sentiments = [
    //     {name: 'Positive', students: 400, fill: '#7A86B6' },
    //     {name: 'Negative', students: 700, fill: '#A8A4CE' },
    //     {name: "Neutral", students: 200, fill: "#C8B6E2"}
    // ]

    const data = [
        { name: 'Smartphones', students: 400, fill: '#F806CC' },
        { name: 'Headphones', students: 700, fill: '#570A57' },
        { name: 'Shoes', students: 200, fill: '#A91079' },
        { name: 'Laptops', students: 1000, fill: '#2E0249' }
    ];

    const segregatedData = [
        {
            "name": "Smartphones",
            "positive": 4000,
            "negative": 2400
        },
        {
            "name": "Headphones",
            "positive": 3000,
            "negative": 1398
        },
        {
            "name": "Shoes",
            "positive": 2000,
            "negative": 9800
        },
        {
            "name": "Laptop",
            "positive": 2780,
            "negative": 3908
        }
    ]
    const [collective, setCollective] = useState([
        { name: 'SmartPhones', students: 0, fill: '#D61C4E' },
        { name: 'HeadPhones', students: 0, fill: '#F77E21' },
        { name: 'Shoes', students: 0, fill: '#FAC213' },
        { name: 'Laptops', students: 0, fill: '#66BFBF' }
    ])

    const [smartphone, setSmartphone] = useState(null);
    const [shoes, setShoes] = useState(null);
    const [laptop, setLaptop] = useState(null);
    const [speaker, setSpeaker] = useState(null);

    const [sentiments, setSentiments] = useState(
        [
            { name: 'Positive', students: 25, fill: '#7A86B6' },
            { name: 'Negative', students: 45, fill: '#A8A4CE' },
            { name: "Neutral", students: 39, fill: "#C8B6E2" }
        ]
    )

    const [sdist, setsdist] = useState({ name: 'Smartphones', students: 42, fill: '#F806CC' })
    const [shdist, setshdist] = useState({ name: 'Shoes', students: 35, fill: '#570a57' })
    const [spdist, setspdist] = useState({ name: 'Speaker', students: 26, fill: '#a91097' })
    const [ldist, setldist] = useState({ name: 'Laptop', students: 29, fill: '#2e0249' })

    const [distribution, setDistribution] = useState(
        [
            { name: 'Smartphones', students: 42, fill: '#F806CC' },
            { name: 'Shoes', students: 35, fill: '#570A57' },
            { name: 'Shoes', students: 26, fill: '#A91079' },
            { name: 'Laptop', students: 29, fill: '#2E0249' }
        ]
    )


    const [item, setItem] = useState(0);
    useEffect(() => {
        setInterval(() => {
            fetch("http://127.0.0.1:8000/api/getTwitterSentiments/smartphone")
                .then(res => res.json())
                .then(res => {
                    setSmartphone(res)
                    let possitive = 0;
                    let negative = 0;
                    let neutral = 0;
                    res['data'].forEach(data => {
                        if (data['sentiment'] == "possitive") {
                            possitive++;
                        } else if (data['sentiment'] == 'neutral') {
                            neutral++;
                        } else {
                            negative++;
                        }
                    })
                    setSentiments(
                        [
                            { name: 'Positive', students: sentiments[0]['students'] + possitive, fill: '#7A86B6' },
                            { name: 'Negative', students: sentiments[1]['students'] + negative, fill: '#A8A4CE' },
                            { name: "Neutral", students: sentiments[2]['students'] + neutral, fill: "#C8B6E2" }
                        ]
                    )
                    setsdist({ name: 'Smartphones', students: res['users'].length, fill: '#F806CC' })
                })
        }, 45000)
        // .then(life)
        setInterval(() => {
            fetch("http://127.0.0.1:8000/api/getTwitterSentiments/shoes")
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    setShoes(res)
                    let possitive = 0;
                    let negative = 0;
                    let neutral = 0;
                    console.log(res['users'])
                    res['data'].forEach(data => {
                        if (data['sentiment'] == "possitive") {
                            possitive++;
                        } else if (data['sentiment'] == 'neutral') {
                            neutral++;
                        } else {
                            negative++;
                        }
                    })
                    setSentiments(
                        [
                            { name: 'Positive', students: sentiments[0]['students'] + possitive, fill: '#7A86B6' },
                            { name: 'Negative', students: sentiments[1]['students'] + negative, fill: '#A8A4CE' },
                            { name: "Neutral", students: sentiments[2]['students'] + neutral, fill: "#C8B6E2" }
                        ]
                    )
                    setshdist({ name: 'Shoes', students: res['users'].length, fill: '#570a57' })
                })
        }, 15000);
        setInterval(() => {
            fetch("http://127.0.0.1:8000/api/getTwitterSentiments/speaker")
                .then(res => res.json())
                .then(res => {
                    setSpeaker(res)
                    let possitive = 0;
                    let negative = 0;
                    let neutral = 0;
                    res['data'].forEach(data => {
                        if (data['sentiment'] == "possitive") {
                            possitive++;
                        } else if (data['sentiment'] == 'neutral') {
                            neutral++;
                        } else {
                            negative++;
                        }
                    })
                    setSentiments(
                        [
                            { name: 'Positive', students: sentiments[0]['students'] + possitive, fill: '#7A86B6' },
                            { name: 'Negative', students: sentiments[1]['students'] + negative, fill: '#A8A4CE' },
                            { name: "Neutral", students: sentiments[2]['students'] + neutral, fill: "#C8B6E2" }
                        ]
                    )
                    setsdist({ name: 'Speaker', students: res['users'].length, fill: '#a91097' })
                })
        }, 30000);
        setInterval(() => {
            fetch("http://127.0.0.1:8000/api/getTwitterSentiments/laptop")
                .then(res => res.json())
                .then(res => {
                    setLaptop(res)
                    let possitive = 0;
                    let negative = 0;
                    let neutral = 0;
                    res['data'].forEach(data => {
                        if (data['sentiment'] == "possitive") {
                            possitive++;
                        } else if (data['sentiment'] == 'neutral') {
                            neutral++;
                        } else {
                            negative++;
                        }
                    })
                    setSentiments(
                        [
                            { name: 'Positive', students: sentiments[0]['students'] + possitive, fill: '#7A86B6' },
                            { name: 'Negative', students: sentiments[1]['students'] + negative, fill: '#A8A4CE' },
                            { name: "Neutral", students: sentiments[2]['students'] + neutral, fill: "#C8B6E2" }
                        ]
                    )
                    setsdist({ name: 'Laptop', students: res['users'].length, fill: '#2e0249' })
                })
        }, 30000)

    }, [])

    return (
        <div>
            <Header />
            <div className="home__section overflow-hidden px-10 py-5">
                <span className="dashboard-heading__main px-5">Dashboard</span>
                <div className="flex">
                    <div className="flex flex-col gap-5">
                        <Card className="card py-4 my-5 w-[20rem]">

                            <span className="subheading px-3">
                                Potential Leads
                            </span>
                            <hr />
                            <div className="h-[68vh] flex-grow overflow-y-scroll">
                                <div className="flex justify-center py-3">
                                    <button className="toggle-button" onClick={() => setItem(0)}>
                                        <a href="#" title="Header" data-toggle="popover" data-placement="top"
                                            data-content="Content"><SmartphoneIcon /></a>

                                    </button>

                                    <button className="toggle-button" onClick={() => setItem(1)}>
                                        <a href="#" title="Header" data-toggle="popover" data-placement="bottom"
                                            data-content="Content"><HeadphonesIcon /></a>

                                    </button>

                                    <button className="toggle-button" onClick={() => setItem(2)} >
                                        <a href="#" title="Header" data-toggle="popover" data-placement="left"
                                            data-content="Content"><Icon icon="mdi:shoe-sneaker" color="white" width={35} height={35} /></a>

                                    </button>

                                    <button className="toggle-button" onClick={() => setItem(3)} >
                                        <a href="#" title="Header" data-toggle="popover" data-placement="right"
                                            data-content="Content"><ComputerIcon /></a>

                                    </button>
                                </div>
                                {
                                    item === 0 && smartphone &&
                                    smartphone['users'].map(data => (
                                        <div onClick={() => {
                                            fetch("http://127.0.0.1:8000/api/sendTweetMessage")
                                                .then(res => console.log(res.json()))
                                        }}>
                                            <Profile authorId={"1381371098193747974"} type="square" name={data.name} authorId={data.id} />
                                        </div>))
                                }
                                {
                                    item===0 && !smartphone && (
                                    <div className='align-middle justify-center mx-[75px]'>
                                        <Loader/>
                                    </div>
                                    )
                                }
                                {
                                    item===1 && !speaker && (
                                    <div className='align-middle justify-center mx-[75px]'>
                                        <Loader/>
                                    </div>
                                    )
                                }
                                {
                                    item === 1 && speaker &&
                                    speaker['users'].map(data => (
                                        <div onClick={() => {
                                            fetch("http://127.0.0.1:8000/api/sendTweetMessage")
                                                .then(res => console.log(res.json()))
                                        }}>
                                            <Profile type="square" name={data.name} authorId={data.id}/>
                                        </div>))
                                }
                                {
                                    item===2 && !shoes && (
                                    <div className='align-middle justify-center mx-[75px]'>
                                        <Loader/>
                                    </div>
                                    )
                                }
                                {
                                    item===3 && !laptop && (
                                    <div className='align-middle justify-center mx-[75px]'>
                                        <Loader/>
                                    </div>
                                    )
                                }
                                {
                                    item === 2 && shoes &&
                                    shoes['users'].map(data => (
                                        <div onClick={() => {
                                            fetch("http://127.0.0.1:8000/api/sendTweetMessage")
                                                .then(res => console.log(res.json()))
                                        }}>
                                            <Profile type="square" name={data.name} authorId={data.id}/>
                                        </div>))
                                }
                                {
                                    item === 3 && laptop &&
                                    laptop['users'].map(data => (
                                        <div onClick={() => {
                                            fetch("http://127.0.0.1:8000/api/sendTweetMessage")
                                                .then(res => console.log(res.json()))
                                        }}>
                                            <Profile type="square" name={data.name} authorId={data.id}/>
                                        </div>))
                                }
                            </div>
                        </Card>
                    </div>
                    <div className="block flex flex-grow px-5 justify-evenly my-5 ">

                        <div>
                            <span
                                className="block dashboard-heading__chart px-5 text-center">Products Sentiments</span>
                            <ResponsiveContainer width={500} height="80%">
                                <PieChart width={200} height={200}>
                                    <Legend verticalAlign="bottom" align="center" />
                                    <Pie data={sentiments} dataKey="students" outerRadius={200} fill="#8884d8" label />
                                </PieChart>
                            </ResponsiveContainer>

                        </div>
                        <div>
                            <span
                                className="block dashboard-heading__chart px-5 text-center">Products Distributions</span>
                            <ResponsiveContainer width={500} height="85%">
                                <PieChart width={200} height={200}>
                                    <Legend verticalAlign="bottom" align="center" />
                                    <Pie data={[sdist, shdist, spdist, ldist]} dataKey="students" outerRadius={200} fill="#8884d8" label />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>


            </div>
            <div className="flex flex-grow justify-evenly mb-5 bg-[#B9E5FF]">

                <div style={{ marginRight: 20 }}>
                    <div className="block dashboard-heading__chart text-center" >Segregagted Sentiments</div>
                    <div className='my-5' />
                    <div className='my-5' />
                    <div className='my-5' />
                    <BarChart width={1000} height={500} data={segregatedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="negative" fill="#F94C66" />
                        <Bar dataKey="positive" fill="#5A8F7B" />
                    </BarChart>
                </div>
            </div>
             <ChatBot><Link to="/dashboard">ChatBot</Link></ChatBot>
             {/* <Loader/> */}
        </div>
    );
};

export default Dashboard;