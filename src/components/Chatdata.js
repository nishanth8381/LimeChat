import React from "react";
import '../App.css';

const Message = (props) => {
    return (
    <li className={props['Message Type']=="0" ? 'self' : 'other'}>
      <div class="avatar"><img src="https://media-exp1.licdn.com/dms/image/C4E0BAQH3B_KN1fResw/company-logo_200_200/0/1623045826452?e=2159024400&v=beta&t=IKdFAdO8e6l4fgE8FmUZ4ucWopgu6KClwBMaI60hwnM" draggable="false"/></div>
      <div class="msg">
        <p>{props['Content']}</p>
        <time>{props['Created At'].slice(11,16)}</time>
      </div>
    </li>
    );
}

export default class Chatdata extends React.Component {
  state = {
    loading: true,
    message: null
  };

  async componentDidMount() {
    const url = "https://retoolapi.dev/m89lfD/limechat?_page=1&_limit=15";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({ message: data, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
     }

     if (!this.state.message) {
       return <div>didn't get a message</div>;
     }

    return (
      <div>
        <div className="menu">
            <div className="back"><i class="fa fa-chevron-left"></i> <img src="https://media-exp1.licdn.com/dms/image/C4E0BAQH3B_KN1fResw/company-logo_200_200/0/1623045826452?e=2159024400&v=beta&t=IKdFAdO8e6l4fgE8FmUZ4ucWopgu6KClwBMaI60hwnM" draggable="false"/></div>
            <div className="name">Limechat</div>
            <div className="last">18:09</div>
        </div>
        <ol className="chat">
                    {this.state.message.map((message)=>{
                    return <Message key={message.ID} {...message}/>
                    })}
        </ol>
        <input className="textarea" type="text" placeholder="Write a reply..."/>
        <p>hello</p>
      </div>
    );
  }
}