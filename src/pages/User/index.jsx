import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import api from "../../services/api";
import ContainerPosts from "../Home/styles";
import Swal from 'sweetalert2';
import Posts from "../../components/Posts";
import Header from "../../components/Header";
import styled from "styled-components";
import Users from "../../components/Users";
import SearchUsers from "../../components/SearchUsers";
import ContainerUsers from "../../components/ContainerUsers";
import Ranking from "../../components/Ranking";
import Menu from "../../components/Menu";
import ContainerPublications from "../../components/ContainerPublications";


export default function User() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const { user } = useContext(UserContext);
    const [infoUser, setInfoUser] = useState({});
    const [infoUserPage, setInfoUserPage] = useState({});
    const [menu, setMenu] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    async function searched(e) {
        e.preventDefault();
        try {
            const { data } = await api.findUsers(search);
            setUsers(data);
            setSearch("");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await api.getPostsByUserId(id);
                console.log(data)
                setPosts(data);
            } catch (error) {
                Swal.fire('ERROR!', 'error');
                console.log(error);
            }
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

    useEffect(() => {
        async function fetchData() {
            if (user !== null) {
                try {
                    const { data } = await api.getUser(id);
                    setInfoUserPage(data);
                } catch (error) {
                    Swal.fire('ERROR!', 'error');
                    console.log(error);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Header menu={menu} setMenu={setMenu} picture={infoUser.picture} user={user} />
            <>
                {!menu ? <>
                    <Info>
                        <img src={infoUserPage.picture} alt="" />
                        <Titule>{infoUserPage.username}'s posts</Titule>
                    </Info>
                    {posts.length > 0 ? <ContainerPosts >

                        {posts.map((post) => {
                            return (
                                <Posts key={post.id} token={user?.token} username={post.users.username} picture={post.picture} userId={post.userId} id={post.id} likes={post.likes} profile={post.users.picture} />
                            )
                        })}
                    </ContainerPosts> : <p>No posts</p>}
                </> : <>
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
                                        <Users picture={item.picture} username={item.username} userId={item.id} />
                                    )
                                })}
                            </ContainerUsers>

                        </> : <></>}
                    </Menu>
                    <ContainerPublications>
                        <Info>
                            <img src={infoUserPage.picture} alt="" />
                            <Titule>{infoUserPage.username}'s posts</Titule>
                        </Info>
                        {posts.length > 0 ? <ContainerPosts >

                            {posts.map((post) => {
                                return (
                                    <Posts key={post.id} token={user?.token} username={post.users.username} picture={post.picture} userId={post.userId} id={post.id} likes={post.likes} profile={post.users.picture} />
                                )
                            })}
                        </ContainerPosts> : <p>No posts</p>}
                    </ContainerPublications>
                </>}
            </>
        </>
    )
}

const Titule = styled.h1`
    font-family: 'Italiana', 'Serif';
    font-size: 36px;
    color: #FFF;
    margin: 10px;
`

const Info = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;

    img{
        width: 50px;
        height: 50px;
        border-radius: 360px;
    }
`