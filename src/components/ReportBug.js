import React, { useState } from 'react'
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import firebase from '../firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useCookies } from 'react-cookie';

function ReportTab() {

    const cookies = useCookies(['user'])
    const dbRef = firebase.database().ref("account-details/" + cookies.Key);

    const [summaryInput, setSummaryInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const [summaryInputError, setSummaryInputError] = useState("");
    const [descriptionInputError, setDescriptionInputError] = useState("");

    const [summaryInputErrorState, setSummaryInputErrorState] = useState(false);
    const [descriptionInputErrorState, setDescriptionInputErrorState] = useState(false);

    const [radioError, setRadioError] = useState(false);
    const [helperText, setHelperText] = React.useState('');

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [deselectAll1, setDeselectAll1] = useState(false);
    const [deselectAll2, setDeselectAll2] = useState(false);
    const [deselectAll3, setDeselectAll3] = useState(false);

    const [urgency, setUrgency] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    function handleReport(e) {
        e.preventDefault();
        if (!summaryInput) {
            setSummaryInputError("Please enter summary")
            setSummaryInputErrorState(true)
        } else if (summaryInput.length < 8) {
            setSummaryInputError("Input atleast a phrase. Ideally 2-3 words")
            setSummaryInputErrorState(true)
         }
        else {
            setSummaryInputError("")
            setSummaryInputErrorState(false)
        } if (!descriptionInput) {
            setDescriptionInputError("Please enter summary")
            setDescriptionInputErrorState(true)
        }else if (descriptionInput.length < 8) {
            setDescriptionInputError("Please enter a full description about the bug")
            setDescriptionInputErrorState(true)
        } else {
            setDescriptionInputError("")
            setDescriptionInputErrorState(false)

        } if (!urgency) {
            setRadioError(true);
            setHelperText('Please select an option.');

        } else {
            setRadioError(false);
            setHelperText('');
        }

        if (summaryInput.length > 8 && descriptionInput.length > 8 && urgency !== "") {
            const reportContent = {
                urgency: urgency,
                summary: summaryInput,
                description: descriptionInput
            }
            dbRef.push(reportContent).then(() => {
                setAlertStatus(true)
                setFeedbackVariant("success")
                setAlertMessage("Hang in there chief, we'll get this sorted out. ")

                setDescriptionInputError("")
                setDescriptionInputErrorState(false)
                setSummaryInputError("")
                setSummaryInputErrorState(false)
                setRadioError(false);
                setHelperText('');
                setSummaryInput('')
                setDescriptionInput('')
                setUrgency('')
                setDeselectAll1(false);
                setDeselectAll2(false);
                setDeselectAll3(false);

            }
            )
            
        }

    }
    function handleRadio(e) {
        setUrgency(e.target.value);
        if (e.target.value === "This is a major bug in the app. There is no workaround.") {
            setDeselectAll1(true);
            setDeselectAll2(false);
            setDeselectAll3(false);

        }
        else if (e.target.value === "This is a major bug in the app, but there is a workaround.") {
            setDeselectAll1(false);
            setDeselectAll2(true);
            setDeselectAll3(false);


        } else {
            setDeselectAll1(false);
            setDeselectAll2(false);
            setDeselectAll3(true);

            
        }
    }
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertStatus(false);
    };
    return (
        <div>
            <Container className="pad-y-md">
                <main className=" main-custom-flex " >
                    <div className="title">
                        <h2>Reports and Feedbacks</h2>
                        <p>Ofcourse, there's no perfect system. Here, we genuinely appreciate your feedbacks and reports and we will cater it as much as we can.</p>
                    </div>
                        <div className="box pad-xy-md m-t-md">
                            <div>
                                <p className="error-red" ><b>{helperText}</b></p>
                                <FormControl error={radioError} component="fieldset">
                                    <FormLabel component="legend">Urgency</FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        defaultValue=""
                                        name="radio-buttons-group"
                                    >
                                            <FormControlLabel  checked={deselectAll1} onChange={handleRadio} color="secondary" value="This is a major bug in the app. There is no workaround." control={<Radio />} label="This is preventing me from using The app. There is no workaround." />
                                            <FormControlLabel className="pad-y-sm" checked={deselectAll2} onChange={handleRadio} color="secondary" value="This is a major bug in the app, but there is a workaround." control={<Radio />} label="This is a major bug in the app, but there is a workaround" />
                                            <FormControlLabel  checked={deselectAll3} onChange={handleRadio} color="secondary" value="This is a minor bug." control={<Radio />} label="This is a minor bug." />

                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="box-default-width">
                                <div className="m-y-sm">
                                    <TextField error={summaryInputErrorState} helperText={summaryInputError} onChange={e => { setSummaryInput(e.target.value) }} value={summaryInput} id="outlined-full-width" fullWidth label="Summary" variant="outlined" type="text" className="text-input-deafult" />
                                </div>
                                <div className="m-y-sm">
                                    <TextField multiline rows={4} error={descriptionInputErrorState} helperText={descriptionInputError} onChange={e => { setDescriptionInput(e.target.value) }} value={descriptionInput} id="outlined-full-width" fullWidth label="Description" variant="outlined" type="text" className="text-input-deafult" />

                                </div>

                            </div>
                            <div  >
                                <Button
                                    onClick={handleReport}
                                    id="btn-large-secondary"
                                    variant="contained"
                                    className="btn-large primary-color"
                                    color="secondary"
                                    size="large"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>

                    {feedbackVariant === "success" ? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={4000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="success">
                            {alertMessage}
                        </Alert>
                    </Snackbar> :
                        feedbackVariant === "warning" ? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={4000} onClose={handleCloseAlert}>
                            <Alert onClose={handleCloseAlert} severity="warning">
                                {alertMessage}
                            </Alert>
                        </Snackbar> :
                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={4000} onClose={handleCloseAlert}>
                                <Alert onClose={handleCloseAlert} severity="error">
                                    {alertMessage}
                                </Alert>
                            </Snackbar>
                    }
                    </main>
                </Container>
            
        </div>

    )
}

export default ReportTab
