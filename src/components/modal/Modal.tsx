import "./Modal.min.css";
import ModalFunction from "../modal-function/ModalFunction";
import {ModalData} from "../modal-function/ModalFunction";
import {ValuesData} from "../input/inputVariables";
import {useFormik} from "formik";
import {useState} from "react";
import Input from "../input/Input";
import {ModalEditSchema} from "../input/ModalEditValidation";
import {mobxStore} from "../../store/auth/mobx";
import {observer} from "mobx-react-lite";

const ModalComponent = ({active, setActive}: ModalData) => {
    const [hidePassword, setHidePassword] = useState(false);
    
    const {values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset} = useFormik({
        initialValues : {
            name : "",
            surname : "",
            email : "",
            country : "",
            city : "",
            password : "",
            address : "",
        },
        validationSchema : ModalEditSchema,
        onSubmit : async (values: ValuesData) => {
            await mobxStore.editUser(values);
            handleReset(values);
        },
    });
    return (
        <ModalFunction
            active={active}
            setActive={setActive}
            activeClassName={"modal__content active"}
            className={"modal__content"}
        >
            <div className="modal__top">
                <h3 className="form-wrapper-modal__title">Edit Profile</h3>
                <span className="cross__wrapper" onClick={() => setActive(false)}>
          <img src="icons/system-uicons_cross.svg" alt="cross"/>
        </span>
            </div>
            <div className="form-wrapper-modal ">
                <div className="form-wrapper-warn__message">
                    <p className="warn_message-info">Owner and customer can only change password,address and phone
                        number</p>
                    <p className="warn_message-info">Regional admin can`t change email,country and town</p>
                    <p className="warn_message-info">Admin can change everything</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="signUp__form--modal">
                        <div className="left__form--modal">
                            <div className=" form__firstname ">
                                <Input
                                    id={"name"}
                                    name={"name"}
                                    type={"text"}
                                    placeholder={"Firstname"}
                                    className={"form firstName"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    touched={touched.name}
                                    errors={errors.name}
                                />
                            </div>
                            
                            <div className=" form__email ">
                                <Input
                                    id={"email"}
                                    name={"email"}
                                    type={"email"}
                                    placeholder={"Email"}
                                    className={"form email"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    touched={touched.email}
                                    errors={errors.email}
                                />
                            </div>
                            
                            <div className=" form__country ">
                                <Input
                                    id={"country"}
                                    name={"country"}
                                    type={"text"}
                                    placeholder={"Country"}
                                    className={"form country"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    touched={touched.country}
                                    errors={errors.country}
                                />
                            </div>
                            
                            <div className=" form__adress ">
                                <Input
                                    id={"address"}
                                    name={"address"}
                                    type={"text"}
                                    placeholder={"Address"}
                                    className={"form adress"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    touched={touched.address}
                                    errors={errors.address}
                                />
                            </div>
                        </div>
                        
                        <div className="right__form--modal">
                            <div className=" form__lastname">
                                <Input
                                    id={"surname"}
                                    name={"surname"}
                                    type={"text"}
                                    placeholder={"Lastname"}
                                    className={"form lastName"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.surname}
                                    touched={touched.surname}
                                    errors={errors.surname}
                                />
                            </div>
                            
                            <div className=" form__password ">
                                <Input
                                    id={"password"}
                                    name={"password"}
                                    type={hidePassword ? "text" : "password"}
                                    placeholder={"Password"}
                                    className={"form password"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    touched={touched.password}
                                    errors={errors.password}
                                />
                                <span
                                    className={hidePassword ? "hiding__icon-modal disabled" : "hiding__icon-modal"}
                                    onClick={() => setHidePassword((prev) => !prev)}
                                >
                  <img src="img/mdi_eye.jpg" alt="eye"/>
                </span>
                            </div>
                            
                            <div className=" form__town ">
                                <Input
                                    id={"city"}
                                    name={"city"}
                                    type={"text"}
                                    placeholder={"Town"}
                                    className={"form town"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    touched={touched.city}
                                    errors={errors.city}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="buttons-modal">
                        <button className="cancel__button" onClick={() => setActive(false)}>
                            Cancel
                        </button>
                        
                        <button className="submit__button-modal" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="form-wrapper-modal--mobile ">
                <div className="form-wrapper-warn__message">
                    <p className="warn_message-info">Owner and customer can only change password,address and phone
                        number</p>
                    <p className="warn_message-info">Regional admin can`t change email,country and town</p>
                    <p className="warn_message-info">Admin can change everything</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="signUp__form--modal">
                        <div className=" form__firstname ">
                            <Input
                                id={"name"}
                                name={"name"}
                                type={"text"}
                                placeholder={"Firstname"}
                                className={"form-modal firstName"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                touched={touched.name}
                                errors={errors.name}
                            />
                        </div>
                        
                        <div className=" form__lastname">
                            <Input
                                id={"surname"}
                                name={"surname"}
                                type={"text"}
                                placeholder={"Lastname"}
                                className={"form-modal lastName"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.surname}
                                touched={touched.surname}
                                errors={errors.surname}
                            />
                        </div>
                        
                        <div className=" form__email-modal ">
                            <Input
                                id={"email"}
                                name={"email"}
                                type={"email"}
                                placeholder={"Email"}
                                className={"form-modal email"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                touched={touched.email}
                                errors={errors.email}
                            />
                        </div>
                        
                        <div className=" form__adress-modal ">
                            <Input
                                id={"address"}
                                name={"address"}
                                type={"text"}
                                placeholder={"Address"}
                                className={"form-modal adress"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                touched={touched.address}
                                errors={errors.address}
                            />
                        </div>
                        
                        <div className=" form__password-modal ">
                            <Input
                                id={"password"}
                                name={"password"}
                                type={hidePassword ? "text" : "password"}
                                placeholder={"Password"}
                                className={"form-modal password"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                touched={touched.password}
                                errors={errors.password}
                            />
                            <span
                                className={hidePassword ? "hiding__icon-modal disabled" : "hiding__icon-modal"}
                                onClick={() => setHidePassword((prev) => !prev)}
                            >
                <img src="img/mdi_eye.jpg" alt="eye"/>
              </span>
                        </div>
                        
                        <div className=" form__country ">
                            <Input
                                id={"country"}
                                name={"country"}
                                type={"text"}
                                placeholder={"Country"}
                                className={"form-modal country"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country}
                                touched={touched.country}
                                errors={errors.country}
                            />
                        </div>
                        <div className=" form__town ">
                            <Input
                                id={"city"}
                                name={"city"}
                                type={"text"}
                                placeholder={"Town"}
                                className={"form-modal town"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                touched={touched.city}
                                errors={errors.city}
                            />
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="cancel__button" onClick={() => setActive(false)}>
                            Cancel
                        </button>
                        
                        <button className="submit__button-modal" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </ModalFunction>
    );
};

export const Modal = observer(ModalComponent);
