import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import Swal from 'sweetalert2';
import styled from "styled-components";
import { UserContext } from "../../contexts/userContext";
// import { Input, Button } from "../SignUp/styles";
import { ThreeDots } from 'react-loader-spinner';
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";
import Posts from "../../components/Posts";
import Users from "../../components/Users";
import ContainerPosts from "./styles";
import SearchUsers from "../../components/SearchUsers";
import ContainerUsers from "../../components/ContainerUsers";
import Ranking from "../../components/Ranking";
import Menu from "../../components/Menu";
import ContainerPublications from "../../components/ContainerPublications";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [infoUser, setInfoUser] = useState({});
    const [publishing, setPublishing] = useState(false);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    async function sendPost(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await api.createPost({ picture: url }, user.token);
            setLoading(false);
            setPublishing(false);
            await refreshPosts();
        } catch (error) {
            Swal.fire('ERROR!', 'error');
            setUrl("");
            setLoading(false);
            console.log(error);
        }
    }

    async function refreshPosts() {
        try {
            const { data } = await api.getPosts();
            setPosts(data);
        } catch (error) {
            Swal.fire('ERROR!', 'error');
            console.log(error);
        }
    }


    useEffect(() => {
        async function fetchData() {
            await refreshPosts()
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (user !== null) {
                try {
                    const { data } = await api.getUser(user.id);
                    setInfoUser(data);
                } catch (error) {
                    Swal.fire('ERROR!', 'error');
                    console.log(error);
                }
            }
        }
        fetchData();
    }, []);

    async function searched(e) {
        e.preventDefault();
        try {
            const { data } = await api.findUsers(search);
            setUsers(data);
            console.log(data)
            setSearch("");
        } catch (error) {
            console.log(error);
        }
    }


    if (posts.length < 1) {
        return (
            <>
                {user ?
                    <>
                        <Header menu={menu} setMenu={setMenu} picture={infoUser.picture} user={user} />
                        {!publishing ? <Publish onClick={() => {
                            if (user === null) {
                                Swal.fire('ERROR!', 'Please, Sign In for publish something!', 'error');
                                navigate("/signin");
                            } else {
                                setPublishing(true);
                            }
                        }}><p>I want to make a post</p></Publish> : <form onSubmit={sendPost}>
                            <Input margin={20} marginLeft={20} type='text' name="post" onChange={(e) => setUrl(e.target.value)} value={url} required placeholder="Submit the file URL" />
                            <Buttons>
                                {!loading ? <Button width={193} margin={20} ><p>Submit</p></Button> : <Button width={193} margin={20} disabled><ThreeDots color='#FFFFFF' height={30} width={100} /></Button>}
                                {!loading ? <Button margin={20} width={150} marginLeft={10} fontSize={20} background={"#000"} onClick={() => setPublishing(false)}><p>Cancelar</p></Button> : <Button margin={20} width={150} marginLeft={10} fontSize={20} background={"#000"} disabled></Button>}
                            </Buttons>
                        </form>}
                    </>
                    :
                    <Header menu={menu} setMenu={setMenu} />
                }
            </>
        )
    }

    return (
        <>
            <Header menu={menu} setMenu={setMenu} user={user} picture={infoUser?.picture} />
            {!menu ?
                <>
                    {!publishing ? <Publish onClick={() => {
                        if (user === null) {
                            Swal.fire('ERROR!', 'Please, Sign In for publish something!', 'error');
                            navigate("/signin");
                        } else {
                            setPublishing(true);
                        }
                    }}><p>I want to make a post</p></Publish> :
                        <Form onSubmit={sendPost}>
                            <Input margin={20} marginLeft={20} type='text' name="post" onChange={(e) => setUrl(e.target.value)} value={url} required placeholder="Submit the file URL" />
                            <Buttons>
                                {!loading ? <Button width={193} margin={20} heigth={40} ><p>Submit</p></Button> : <Button width={193} heigth={40} margin={20} disabled><ThreeDots color='#FFFFFF' height={30} width={100} /></Button>}
                                {!loading ? <Button margin={20} width={150} heigth={40} marginLeft={10} fontSize={20} background={"#000"} onClick={() => setPublishing(false)}><p>Cancelar</p></Button> : <Button margin={20} width={150} heigth={40} marginLeft={10} fontSize={20} background={"#000"} disabled></Button>}
                            </Buttons>
                        </Form>}
                    <ContainerPosts >

                        {posts.map((post) => {
                            return (
                                <Posts key={post.id} token={user?.token} username={post.users.username} picture={post.picture} userId={post.userId} id={post.id} likes={post.likes} profile={post.users.picture} />
                            )
                        })}
                    </ContainerPosts>
                </> :
                <>
                    <Menu>
                        <SearchUsers>
                            <form onSubmit={searched}>
                                <input name="search" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
                            </form>
                            <ion-icon onClick={searched} name="search-outline"></ion-icon>

                        </SearchUsers>
                        {users.length > 0 ? <>
                            <ContainerUsers>
                                {users.map((item) => {
                                    return (
                                        <Users key={item.id} picture={item.picture} username={item.username} userId={item.id} />
                                    )
                                })}
                            </ContainerUsers>

                        </> : <></>}
                    </Menu>

                    <ContainerPublications>

                        {!publishing ? <Publish onClick={() => {
                            if (user === null) {
                                Swal.fire('ERROR!', 'Please, Sign In for publish something!', 'error');
                                navigate("/signin");
                            } else {
                                setPublishing(true);
                            }
                        }}><p>I want to make a post</p></Publish> :
                            <Form onSubmit={sendPost}>
                                <Input margin={20} marginLeft={20} type='text' name="post" onChange={(e) => setUrl(e.target.value)} value={url} required placeholder="Submit the file URL" />
                                <Buttons>
                                    {!loading ? <Button width={193} margin={20} heigth={40} ><p>Submit</p></Button> : <Button width={193} heigth={40} margin={20} disabled><ThreeDots color='#FFFFFF' height={30} width={100} /></Button>}
                                    {!loading ? <Button margin={20} width={150} heigth={40} marginLeft={10} fontSize={20} background={"#000"} onClick={() => setPublishing(false)}><p>Cancelar</p></Button> : <Button margin={20} width={150} heigth={40} marginLeft={10} fontSize={20} background={"#000"} disabled></Button>}
                                </Buttons>
                            </Form>}
                        <ContainerPosts >

                            {posts.map((post) => {
                                return (
                                    <Posts key={post.id} token={user?.token} username={post.users.username} picture={post.picture} userId={post.userId} id={post.id} likes={post.likes} profile={post.users.picture} />
                                )
                            })}
                        </ContainerPosts>
                    </ContainerPublications>

                </>
            }
        </>
    )
}

const Form = styled.form`
            @media(min-width: 800px){
                display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin-bottom: 5px;
    }
            `

const Publish = styled.div`
            margin: 15px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 409px;
            height: 51px;
            border-radius: 8px;
            background-color: #C88383;
            border: 0 none;
            cursor: pointer;

            &:active{
                background-color: #832222;
            }


            p{
                font-family: 'Italiana', serif;
            color: #FFFFFF;
            font-size: 32px;
    }

            `

const Buttons = styled.div`
            display: flex;
            justify-content: center;
            align-items: center;
            `