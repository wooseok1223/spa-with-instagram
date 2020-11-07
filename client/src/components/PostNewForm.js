import React, {useState} from 'react'
import {Button, Card, Form, Input, Upload, Modal, notification} from "antd";
import {FrownOutlined, PlusOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {getBase64FormFile} from "../utils/base64";
import {useAppContext} from "../store";
import {parseErrorMessages} from "../utils/forms";
import {useHistory} from 'react-router-dom'
import { axiosInstance} from "api";

const UploadText = styled.div`
`;

const ModalImage = styled.img`
    width:100%
`

const apiUrl = "/api/posts/"

export default function PostNewForm() {
    const {store: {jwtToken}} = useAppContext()
    const history = useHistory()
    const [fieldErrors, setFieldErrors] = useState({})
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null
    })
    const [fileList, setFileList] = useState([])

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const handleFinish = async (fieldValues) => {
        const {caption, location, photo: {fileList}} = fieldValues

        const headers = {Authorization: `JWT ${jwtToken}`};

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("location", location);
        fileList.forEach(file => {
            formData.append("photo", file.originFileObj);
        });


        try {
            const response = await axiosInstance.post(apiUrl, formData, {headers})

            history.push('/')
        } catch (error) {
            if (error.response) {
                const {status, data: fieldsErrorMessages} = error.response;
                if (typeof fieldsErrorMessages === "string") {
                    notification.open({
                        message: "서버 오류",
                        description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
                        icon: <FrownOutlined style={{color: "#ff3333"}}/>
                    });
                } else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }

    }

    const handleUploadChange = ({fileList}) => {
        setFileList(fileList)
    }

    const handlePreviewPhoto = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64FormFile(file.originFileObj)
        }

        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview
        })
    }


    return (
        <Form
            {...layout}
            onFinish={handleFinish}
        >
            <Form.Item
                label="Caption"
                name="caption"
                rules={[
                    {
                        required: true,
                        message: 'Caption을 입력해주세요.',
                    }
                ]}
                hasFeedback
                {...fieldErrors.caption}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea/>
            </Form.Item>

            <Form.Item
                label="Location"
                name="location"
                rules={[
                    {
                        required: true,
                        message: 'Location을 입력해주세요.',
                    }
                ]}
                hasFeedback
                {...fieldErrors.location}
                {...fieldErrors.non_field_errors}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Photo"
                name="photo"
                rules={[{
                    required: true,
                    message: "사진을 입력해주세요"
                }]}
                hasFeedback
                {...fieldErrors.photo}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => {
                        return false
                    }}
                    onChange={handleUploadChange}
                    onPreview={handlePreviewPhoto}
                >

                    {fileList.length > 0 ? null : (
                        <div>
                            <PlusOutlined/>
                            <UploadText>
                                Upload
                            </UploadText>

                        </div>
                    )}
                </Upload>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <Modal
                visible={previewPhoto.visible}
                footer={null}
                onCancel={() => {
                    setPreviewPhoto({visible: false})
                }}
            >
                <ModalImage
                    src={previewPhoto.base64}
                    alt="preview"
                />
            </Modal>
        </Form>
    )
}