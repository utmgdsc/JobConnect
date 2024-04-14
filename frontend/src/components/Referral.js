import { useContext, useState } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import {TextField, MenuItem, Grid} from "@mui/material"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useParams } from "react-router-dom";



const Referral = () => {
  const {
    referUser,
    referralInfo, 
    updateReferralInfo,
    isReferLoading,
    referError
  } = useContext(AuthContext);
  const { id } = useParams();
  const handleReferUser = (e) => {
    e.preventDefault();
    referUser(id); // Pass the id to referUser function
  };
  return (
    <>
      <Form onSubmit={handleReferUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "20%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h3>About your referral</h3>
              <p>Please enter some details about your referral</p>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateReferralInfo({ ...referralInfo, name: e.target.value })
                }
                value={referralInfo.name}
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateReferralInfo({ ...referralInfo, email: e.target.value })
                }
                value={referralInfo.email}
              />
              <PhoneInput
                // type="phone"
                // placeholder="phone"
                country={"ca"}
                value={referralInfo.phone}
                onChange={(phone) =>
                  updateReferralInfo({
                    ...referralInfo,
                    phone: phone,
                  })
                }
              />
              <TextField
                select
                label="How do you know this person?"
                variant="outlined"
                value={referralInfo.relationship}
                onChange={(e) =>
                  updateReferralInfo({ ...referralInfo, relationship: e.target.value })
                }
              >
                <MenuItem value="workedTogether">We directly worked together</MenuItem>
                <MenuItem value="studiedTogether">We studied together</MenuItem>
                <MenuItem value="friends">We're friends</MenuItem>
                <MenuItem value="justMet">We just met</MenuItem>
              </TextField>
              <TextField
                  label="Recommendation"
                  multiline
                  rows={8}
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={referralInfo.description}
                  onChange={(e) =>
                    updateReferralInfo({
                      ...referralInfo,
                      description: e.target.value,
                    })
                  }
                />
             
              <Button
                variant="primary"
                type="submit"
                disabled={isReferLoading}
              >
                {isReferLoading ? "Submitting your referral..." : "Submit referral"}
              </Button>

              {referError?.error && (
                <Alert variant="danger">
                  <b>{`Error status code: ${referError?.status}`}</b>
                  <p>{referError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Referral;