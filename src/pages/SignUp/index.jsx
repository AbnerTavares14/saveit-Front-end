import { useState, useContext } from "react";
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Main, Form } from "./styles";
import api from "../../services/api";
import { UserContext } from "../../contexts/userContext";
import Input from "../../components/Input";
import Button from "../../components/Button";


export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picture, setPicture] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function signUp(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await api.signUp({ username, email, password, confirmPassword, picture });
            navigate("/signin");
        } catch (error) {
            console.log(error);
            Swal.fire('ERROR!', 'INVALID DATA', 'error');
            setEmail("");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setPicture("");
            setLoading(false);
        }
    }

    return (
        <>
            <Main>
                <h1>SaveIt</h1>
                <Form onSubmit={signUp}>
                    {!loading ? <Input margin={20} type='text' name="username" onChange={(e) => setUsername(e.target.value)} value={username} required placeholder="Username" /> : <Input disabled />}
                    {!loading ? <Input margin={20} type='email' name="email" onChange={(e) => setEmail(e.target.value)} value={email} required placeholder="Email" /> : <Input disabled />}
                    {!loading ? <Input margin={20} type='password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} required placeholder="Password" /> : <Input disabled />}
                    {!loading ? <Input margin={20} type='password' name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required placeholder="Confirm password" /> : <Input disabled />}
                    {!loading ? <Input margin={20} type='text' name="picture" onChange={(e) => setPicture(e.target.value)} value={picture} required placeholder="Picture" /> : <Input disabled />}
                    {!loading ? <Button margin={60} marginLeft={0} type='submit'><p>SignUp</p></Button> : <Button disabled><ThreeDots color='#FFFFFF' height={30} width={100} /></Button>}
                </Form>
                <Link to='/signin'>
                    <h2>Switch back to log in</h2>
                </Link>
            </Main>
        </>
    )

}