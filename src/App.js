import React, { Component, createRef } from 'react';

class App extends Component {
	id = 1;

	state = {
		username: '',
		password: '',
		edit_username: '',
		edit_password: '',
		list: []
	};

	usernameInput = createRef();

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleInsert = (e) => {
		e.preventDefault();
		const { list, username, password } = this.state;
		this.setState({
			username: '',
			password: '',
			list: list.concat({
				username,
				password,
				editMode: false,
				id: this.id
			})
		});

		this.id++;
		this.usernameInput.current.focus();
	};

	handleDelete = (id) => {
		//삭제하기 버튼 클릭 이벤트
		this.setState({
			list: this.state.list.filter((user) => user.id !== id)
		});
	};

	handleModify = (id) => {
		//수정하기 버튼 클릭 이벤트
		const { list } = this.state;
		this.setState({
			list: list.map((user) => {
				if (user.editMode) {
					return {
						...user,
						editMode: false
					};
				}
				if (user.id === id) {
					this.setState({
						edit_username: user.username,
						edit_password: user.password
					});
					return {
						...user,
						editMode: true
					};
				}
				return user;
			})
		});
	};

	handleSave = (id) => {
		//저장 버튼 클릭 이벤트
		const { list, edit_username, edit_password } = this.state;
		this.setState({
			list: list.map((user) => {
				if (user.id === id) {
					this.setState({
						edit_username: '',
						edit_password: ''
					});
					return {
						...user,
						username: edit_username,
						password: edit_password,
						editMode: false
					};
				}
				return user;
			})
		});
	};

	render() {
		const {
			list,
			username,
			password,
			edit_username,
			edit_password
		} = this.state;
		return (
			<div>
				<form onSubmit={this.handleInsert}>
					<div>
						<input
							value={username}
							name="username"
							onChange={this.handleChange}
							ref={this.usernameInput}
						/>
						<input
							value={password}
							name="password"
							onChange={this.handleChange}
						/>
						<button type="submit">추가하기</button>
					</div>
				</form>

				<ul>
					{list.map((user) => {
						return (
							<li key={user.id}>
								{user.username}의 비밀번호는 {user.password} 입니다.
								<br />
								<button onClick={() => this.handleDelete(user.id)}>
									삭제하기
								</button>
								<button onClick={() => this.handleModify(user.id)}>
									수정하기
								</button>
								{user.editMode ? (
									<form
										onSubmit={(e) => {
											e.preventDefault();
											this.handleSave(user.id);
										}}
									>
										<div>
											<input
												value={edit_username}
												name="edit_username"
												onChange={this.handleChange}
											/>
											<input
												value={edit_password}
												name="edit_password"
												onChange={this.handleChange}
											/>
											<button type="submit">저장</button>
										</div>
									</form>
								) : (
									''
								)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default App;
