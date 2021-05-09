import React, {useEffect} from "react";
import {
    Form,
    Input,
    Button,
    Select
} from "antd";
import {MinusCircleOutlined, PlusOutlined, CheckSquareOutlined} from "@ant-design/icons";
import {useAgeGroups} from "../../hooks/AgeGroupHooks";
import {useCategories} from "../../hooks/CategoryHooks";
import {useSkillLevels} from "../../hooks/SkillLevelHooks";

const {Option} = Select;

const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16}
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 16}
};

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16}
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {offset: 6, span: 16}
};

const PackageForm = ({fieldValues, onFinish, finishing, clearFormAfterFinishing}) => {
    const [form] = Form.useForm();

    const ageGroups = useAgeGroups();
    const categories = useCategories();
    const skillLevels = useSkillLevels();

    useEffect(() => {
        form.setFieldsValue(fieldValues);
    }, [fieldValues]);

    return (
        <Form form={form} {...layout} name="basic" onFinish={values => {
            onFinish(values);
            if (clearFormAfterFinishing) {
                form.resetFields();
            }
        }}>
            <Form.Item label="Id"
                       name="id"
                       hidden>
                <Input/>
            </Form.Item>
            <Form.Item label="Name"
                       name="name"
                       hasFeedback
                       rules={[{required: true, message: "Please input the product name!"}]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Description"
                       name="description"
                       hasFeedback
                       rules={[{required: true, message: "Please input the description!"}]}>
                <Input.TextArea placeholder="Description"
                                autoSize={{minRows: 3, maxRows: 5}}/>
            </Form.Item>
            <Form.Item label="Age Group"
                       name="age_group"
                       hasFeedback
                       rules={[{required: true, message: "Required!"}]}>
                <Select defaultValue={-1}>
                    <Option key={0} value={-1}>Select Age Group</Option>
                    {ageGroups.map((ageGroup, index) => {
                        return (
                            <Option key={index} value={ageGroup.id}>{ageGroup.name}</Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Category"
                       name="category"
                       hasFeedback
                       rules={[{required: true, message: "Required!"}]}>
                <Select defaultValue={-1}>
                    <Option key={0} value={-1}>Select Category</Option>
                    {categories.map((category, index) => {
                        return (
                            <Option key={index} value={category.id}>{category.name}</Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Skill Level"
                       name="skill_level"
                       hasFeedback
                       rules={[{required: true, message: "Required!"}]}>
                <Select defaultValue={-1}>
                    <Option key={0} value={-1}>Select Skill Level</Option>
                    {skillLevels.map((skillLevel, index) => {
                        return (
                            <Option key={index} value={skillLevel.id}>{skillLevel.name}</Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.List name="product_groups"
                       rules={[
                           {
                               validator: async (_, names) => {
                                   if (!names || names.length < 1) {
                                       return Promise.reject(new Error("At least 1 product"));
                                   }
                               }
                           }
                       ]}>
                {(fields, {add, remove}, {errors}) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                      label={index === 0 ? "Product Groups" : ""}
                                      required={false}
                                      key={field.key}>
                                <Form.Item {...field}
                                           validateTrigger={["onChange", "onBlur"]}
                                           rules={[
                                               {
                                                   required: true,
                                                   whitespace: true,
                                                   message: "Please input product's id or delete this field.",
                                               },
                                           ]}
                                           noStyle>
                                    <Input placeholder="Product Group Id" style={{width: "60%"}}/>
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item {...tailLayout}>
                            <Button type="dashed"
                                    onClick={() => add()}
                                    style={{width: "60%"}}
                                    icon={<PlusOutlined/>}>
                                Add product group
                            </Button>
                            <Form.ErrorList errors={errors}/>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={finishing}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PackageForm;
