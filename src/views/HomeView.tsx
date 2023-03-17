import React, { useEffect, useState, useCallback } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Form, Card, Button } from 'react-bootstrap';
import FormFilter from '../components/FormFIlter';
import { Api } from '../config/api';
import { DateValue } from '../utils/date';

interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  created_at: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [req, setReq] = useState<Job[]>([]);
  const [form, setForm] = useState({
    location: '',
    description: '',
    full_time: false,
    page: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { description, location, full_time, page } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.name === 'full_time' ? e.target.checked : e.target.value
    });
  };

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      const des = description === '' ? '' : `description=${description}`;
      const loc = location === '' ? '' : `location=${location}`;
      const pag = page === '' ? '' : `page=${page}`;
      const ftime = full_time === false ? '' : `full_time=${full_time}`;
      const arr = [des, loc, pag, ftime];
      const filteredArr = arr.filter((str) => str !== '');
      const param = filteredArr.join('&');
      const response = await Api.get(`/reqruitment?${param}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      });
      if (response.data.statusCode === 200) {
        setReq(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error occurred while fetching data');
      console.error(error);
    }
  }, [description, location, page, full_time]);

  const onSubmit = async () => {
    await loadAllData();
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const getDetail = (id: string, navigate: any) => {
    localStorage.setItem('id', id);
    navigate('/detail');
  };


  return (
    <Container>
      <Row className="mt-5">
        <Col md={4}>
          <FormFilter
            onChange={(e) => onChange(e)}
            name="description"
            label="Job Description"
            placeholder="Filter by title,companies, expertise"
          />
        </Col>
        <Col md={4}>
          <FormFilter
            onChange={(e) => onChange(e)}
            name="location"
            label="Location"
            placeholder="Filter by City,state,zip code or Country"
          />
        </Col>
        <Col md={2}>
          <Form.Check
            // checked={fullTime === 'full'}
            id="default"
            label="FULL_TIME"
            name="full_time"
            onChange={(e) => onChange(e)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={onSubmit}>Search</Button>
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <Col md={12}>
          <Card>
            <Card.Body
              style={{
                padding: '20px'
              }}
            >
              <Row>
                <h1 className="title-joblist">Job List</h1>
                <hr />
              </Row>
              {req &&
                req.map((item, i) => {
                  return (
                    <Row key={i}>
                      <Col md={12} className="d-flex justify-content-between">
                        <div>
                          <h1 onClick={() => getDetail(item.id, navigate)} className="title-job">
                            {item.title}
                          </h1>
                          <p>
                            <span className="text-company">{item.company}</span>
                            {' - '}
                            <span className="time">{item.type}</span>
                          </p>
                        </div>
                        <div>
                          <h3 className="city">{item.location}</h3>
                          <span className="text-company">{DateValue(item.created_at)}</span>
                        </div>
                      </Col>
                      <hr />
                    </Row>
                  );
                })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
