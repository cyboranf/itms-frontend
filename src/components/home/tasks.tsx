import { CalendarOutlined } from "@ant-design/icons";
import { Badge, Card, List, Skeleton } from "antd";
import React, { useState } from "react";
import { Text } from "../text";

function Tasks() {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<Card
			style={{ height: "100%" }}
			headStyle={{ padding: "8px 16xp" }}
			bodyStyle={{ padding: "0 1rem" }}
			title={
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
					}}
				>
					<CalendarOutlined />
					<Text size='sm' style={{ marginLeft: "0.7rem" }}>
						Tasks
					</Text>
				</div>
			}
		>
			{isLoading ? (
				<List
					itemLayout='horizontal'
					dataSource={Array.from({ length: 2 }).map((_, index) => ({
						id: index,
					}))}
					renderItem={() => <Skeleton active />}
				></List>
			) : (
				<List
					itemLayout='horizontal'
					dataSource={[
						{
							id: 1,
							startDate: "2024-04-07",
							endDate: "2024-04-08",
							title: "Complete task 1",
						},
						{
							id: 2,
							startDate: "2024-04-08",
							endDate: "2024-04-10",
							title: "Review task 2",
						},
						{
							id: 3,
							startDate: "2024-04-08",
							endDate: "2024-04-10",
							title: "Review task 3",
						},
						{
							id: 4,
							startDate: "2024-04-07",
							endDate: "2024-04-08",
							title: "Complete task 4",
						},
						{
							id: 5,
							startDate: "2024-04-07",
							endDate: "2024-04-08",
							title: "Complete task 4",
						},
					]}
					renderItem={(item) => {
						return (
							<List.Item>
								<List.Item.Meta
									avatar={<Badge status='success' />}
									title={<Text>{item.startDate}</Text>}
									description={
										<Text ellipsis={{ tooltip: true }} strong>
											{item.title}
										</Text>
									}
								/>
							</List.Item>
						);
					}}
				></List>
			)}
		</Card>
	);
}

export default Tasks;
