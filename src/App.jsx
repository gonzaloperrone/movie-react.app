import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Movies } from './pages/Movies';
import { Tv } from './pages/TV';
import { MovieDetails } from "./pages/MovieDetails";
import { TvDetails } from "./pages/TvDetails";
import { LandingPage } from "./pages/LandingPage";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { AiFillHome } from 'react-icons/ai';
import { GiFilmSpool } from 'react-icons/gi';
import { FiMonitor } from 'react-icons/fi';


export function App() {
  return (
    <Router>
      <header>
        <Navbar bg="dark" className={styles.header} expand="lg">
          <Container>
            <Link className={styles.title} to="/">Movies & Series Finder</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="justify-content-end">
              <Link to="/" className={styles.subTitle}><span className={styles.icon}><AiFillHome /></span><br />Home</Link><hr />
                <Link to="/moviesGrid" className={styles.subTitle}><span className={styles.icon}><GiFilmSpool /></span><br />Movies</Link><hr />
                <Link to="/tvGrid" className={styles.subTitle}><span className={styles.icon}><FiMonitor /></span><br />Series & TV</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Routes>
          <Route path="/moviesGrid" element={<Movies />} />
          <Route path="/tvGrid" element={<Tv />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/tv/:tvId" element={<TvDetails />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
      <footer>
        
      </footer>
    </Router>
  );
}