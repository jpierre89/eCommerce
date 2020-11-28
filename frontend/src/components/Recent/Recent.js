import React from 'react';
import axios from 'axios';
import ScrollArea from 'react-scrollbar';
import './Recent.css';

export default class Recent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Recently Viewed'
        }

        this.showRecentItems = this.showRecentItems.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.recentStoreItemsViewed !== prevProps.recentStoreItemsViewed) {
            // this check prevents infinite recursion

            this.showRecentItems();
        }
    }

    showRecentItems() {
        if (this.props.recentStoreItemsViewed) {
            const items = [];
            this.props.recentStoreItemsViewed.forEach((item) => {
                items.push(<li key={item._id}>{item.name}</li>)             
            });
    
            return (
                <ul>
                    {items}
                </ul>
            )
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>           
                <ScrollArea>
                    {this.showRecentItems}        
                </ScrollArea>
            </div>
        )
    }

}