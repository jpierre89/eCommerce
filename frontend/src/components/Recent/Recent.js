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
                items.push(<li id="recent-item" key={item._id}>{item.name}</li>)             
            });
    
            return (
                <ol>
                    {items}
                </ol>
            )
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>           
                <ScrollArea stopScrollPropagation={true} smoothScrolling={true} className="small-scroll-area">
                    {this.showRecentItems}        
                </ScrollArea>
            </div>
        )
    }

}