import React, {useState} from 'react'
import './Email.scss'
import {Form} from 'react-final-form'
import MessageEmail from '../MessageEmail/MessageEmail'
import PasswordEmail from '../PasswordEmail/PasswordEmail'
import YourEmail from '../YourEmail/YourEmail'

interface IProps {
    component: boolean;
    openComponent: any
}

const Email:React.FC<IProps> = ({component, openComponent}) => {

    const [input, setInput] = useState("")

    const [passwordComponent, setPasswordComponent] = useState(false)

    const passwordBtn = () => {
        setPasswordComponent(true)
        openComponent(true)
    }

    const submitBtn = (e:any) => {
        openComponent(!component)
    }

    const validate = (email:any) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

   const validateEmail = (value:any) => (value && validate(value) ? null : "Invalid mail")

    return (
        <Form onSubmit={submitBtn} 
            render={(props:any) => { 
                return( 
                    <div className="email">
                        <h2 className="email__number">1</h2>
                        <div className="email__component">
                            <h2 className="email__heading">Your email</h2>
                            <p className={!component ? "email__email" : "email__email close"}>{input}</p>
                            <button onClick={() => {openComponent(!component)}} className={!component ? "email__heading__button" : "email__heading__button close"}>Edit</button>
                            <form onSubmit={props.handleSubmit} className={component ? "email__component__form" : "email__component__form close"}>
                                <YourEmail 
                                    submitBtn={submitBtn}
                                    input={input}
                                    validateEmail={validateEmail}
                                    setInput={setInput}
                                />
                                <MessageEmail
                                    passwordBtn={passwordBtn}
                                    passwordComponent={passwordComponent}
                                    input={input}
                                    validate={validate}
                                    submitBtn={props.handleSubmit}
                                />
                                <PasswordEmail 
                                    passwordComponent={passwordComponent}
                                    input={input}
                                    validate={validate}
                                    submitBtn={props.handleSubmit}
                                />
                            </form>
                        </div>
                    </div>
                )
            }}
        />
    )
}

export default Email