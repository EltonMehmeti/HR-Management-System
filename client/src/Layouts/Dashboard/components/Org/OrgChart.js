import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/UserContext";
import { Tree, TreeNode } from "react-organizational-chart";

const OrgChart = () => {
    const [employees, setEmployees] = useState([]);
    const { token } = useUser();
    const [data, setData] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState({});

    const fetchAllOrg = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/org", config);
            const employeesWithImageFilename = res.data.map((employee) => {
                const imageFilename = employee?.image?.split(/[\\/]/).pop();
                return {
                    imageFilename,
                    ...employee,
                };
            });
            setEmployees(employeesWithImageFilename);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAllOrg();
        }
    }, [token]);

    useEffect(() => {
        const buildTree = (employees) => {
            if (employees.length === 0) {
                return null; // Return null if employees array is empty
            }

            const employeeMap = {};

            employees.forEach(employee => {
                employee.children = [];
                employeeMap[employee.id] = employee;
            });

            const tree = [];
            employees.forEach(employee => {
                if (employee.reportsTo === null) {
                    tree.push(employee);
                } else if (employeeMap[employee.reportsTo]) {
                    employeeMap[employee.reportsTo].children.push(employee);
                }
            });

            return tree.length > 0 ? tree[0] : null;  // Return the root or null if no root found
        };

        setData(buildTree(employees));
    }, [employees]);

    const handleToggleExpand = (nodeId) => {
        setExpandedNodes(prevState => ({
            ...prevState,
            [nodeId]: !prevState[nodeId],
        }));
    };

    const renderNode = (employee, widthPercentage) => {
        return (
            <TreeNode
                key={employee.id}
                label={
                    <div className={`w-${widthPercentage} p-4 border border-gray-200 rounded-lg -lg`}>
                        <img
                            src={`http://localhost:3001/uploads/${employee.imageFilename}`}
                            alt={employee.name}
                            className="w-12 h-12 rounded-full mx-auto mb-2"
                        />
                        <div className="text-center">
                            <h5 className="text-lg font-semibold mb-1">{employee.name}</h5>
                            <p className="text-sm text-gray-600">{employee.role}Software Engineer</p>
                        </div>
                        {employee.children && employee.children.length > 0 && (
                            <button
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md -md hover:bg-blue-600"
                                onClick={() => handleToggleExpand(employee.id)}
                            >
                                {expandedNodes[employee.id] ? "Collapse" : "Expand"}
                            </button>
                        )}
                    </div>
                }
                className="custom-tree-node" // Apply custom CSS class
            >
                {expandedNodes[employee.id] && employee.children.map(child => renderNode(child, 100 / employee.children.length))}
            </TreeNode>
        );
    };

    return (
        <div className="overflow-y-scroll max-w-full">
            <Tree label={
                <div className="w-full items-center justify-center p-4 border border-gray-200 rounded-lg ">
                    <img
                        src={`http://localhost:3001/uploads/${data?.imageFilename}`}
                        alt={data?.name}
                        className="w-12 h-12 rounded-full mx-auto mb-2"
                    />
                    <div className="text-center">
                        <h5 className="text-lg font-semibold mb-1">{data?.name}</h5>
                        <p className="text-sm text-gray-600">{data?.role}Chief Executive Officer</p>
                    </div>
                </div>
            }>
                {data?.children && data.children.map(child => renderNode(child, 100 / data.children.length))}
            </Tree>
        </div>
    );
};

export default OrgChart;
