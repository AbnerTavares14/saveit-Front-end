import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import { Form, Main } from "../SignUp/styles";
import api from "../../services/api";
import Swal from 'sweetalert2';
import { UserContext } from "../../contexts/userContext";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function authentication(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.login({ email, password });
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            navigate("/");
        } catch (error) {
            Swal.fire('ERROR!', 'AUTHENTICATION ERROR', 'error');
            setLoading(false);
            setPassword("");
            console.log(error);
        }
    }

    return (
        <>
            <Main>
                <h1>SaveIt</h1>
                <Form onSubmit={authentication}>
                    {!loading ? <Input margin={20} type='email' name="email" onChange={(e) => setEmail(e.target.value)} value={email} required placeholder="Email" /> : <Input margin={20} disabled />}
                    {!loading ? <Input margin={20} type='password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} required placeholder="Password" /> : <Input margin={20} disabled />}
                    {!loading ? <Button margin={60} marginLeft={0} type='submit'><p>SignIn</p></Button> : <Button margin={60} marginLeft={0} disabled><ThreeDots color='#FFFFFF' height={30} width={100} /></Button>}
                </Form>
                <Link to='/signup'>
                    <h2>Not registered yet? Register now</h2>
                </Link>
            </Main>
        </>
    )

}