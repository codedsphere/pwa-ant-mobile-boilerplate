/**
 * Created by Administrator on 2018/6/6.
 */
import React from 'react';
import css from './layout.less'

class HorizontalLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const lists = this.props.lists;
        return (
            <ul className={css.horizontalLists}>
                {
                    lists.map((item,index)=>{
                        return (
                            <li key={index+item.text}>
                                <img src={item.src} alt=""/>
                                <p>{item.text}</p>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

export default HorizontalLists
