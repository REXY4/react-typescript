import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Api } from '../config/api';
import { useParams } from 'react-router-dom';

interface DetailData {
  type: string;
  location: string;
  title: string;
  description: string;
  company: string;
  company_logo: string;
  how_to_apply: string;
}

const Detail = (): JSX.Element => {
  const [detail, setDetail] = useState<DetailData>({ type: '', location: '', title: '', description: '', company: '', company_logo: '', how_to_apply: '' });
  
  const loadData = async (): Promise<void> => {
    const response = await Api.get('/reqruitment/'+ localStorage.id, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    if (response.data.statusCode === 200) {
      setDetail(response.data.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Body style={{ padding: '40px' }}>
              <Row>
                <p className="location-detail">
                  {detail.type}/{detail.location}
                </p>
                <h1>{detail.title}</h1>
                <hr />
              </Row>
              <Row>
                <Col md={7}>
                  <div dangerouslySetInnerHTML={{ __html: detail.description }} />
                </Col>
                <Col md={5}>
                  <Card>
                    <Card.Header style={{color : "white"}}>{detail.company}</Card.Header>
                    <Card.Body>
                      <Image
                        src={detail.company_logo}
                        style={{
                          width: '100%',
                          height: '100px'
                        }}
                      />
                    </Card.Body>
                    <Card.Footer>
                      <div dangerouslySetInnerHTML={{ __html: detail.how_to_apply }} />
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;