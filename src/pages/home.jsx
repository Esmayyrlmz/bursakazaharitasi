import {useEffect, useState} from "react";
import Map from "../components/map";
import {useNavigate} from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {FaUserAlt} from 'react-icons/fa';


export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(-1);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token == null || token == undefined) {
            navigate('/login');
            return;
        }

        fetch("https://acikyesil.bursa.bel.tr/geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=topp:Kaza_Kara_Noktalari&outputFormat=json")
            .then(response => response.json())
            .then(result => {
                let dataSet = [];
                result.features.forEach((item) => {

                    let values = [];
                    for (let i = 2008; i <= new Date().getFullYear(); i++) {
                        values.push({
                            key: i,
                            value: item.properties[i] ?? 0
                        });
                    }

                    dataSet.push({
                        title: item.id,
                        coordinates: item.geometry.coordinates,
                        values: values
                    });

                    setData(dataSet);

                    let years = [];
                    years.push({
                        key: -1,
                        value: 'Tüm Yıllar'
                    });
                    for (let i = 2008; i <= new Date().getFullYear(); i++) {
                        years.push({
                            key: i,
                            value: i.toString()
                        });
                        setYears(years);
                    }

                });
            });
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="#home">Website Adı</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Ana Sayfa</Nav.Link>
                        <NavDropdown title="Yıllar" id="basic-nav-dropdown">
                            {
                                years.map((item, index) => {
                                    return <NavDropdown.Item key={item.key}
                                                             onClick={() => setSelectedYear(item.key)}
                                    >
                                        {item.value}
                                    </NavDropdown.Item>
                                })
                            }
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown alignRight title={<FaUserAlt size="1.5em"/>} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={logout}>Çıkış Yap</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Map data={data} year={selectedYear}></Map>
        </div>
    );
};
