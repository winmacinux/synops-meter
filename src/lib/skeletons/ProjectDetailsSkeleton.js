import React, { Component } from 'react'
import Skeleton from "react-loading-skeleton";

export default class ProjectDetailsSkeleton extends Component {

    render() {
        return (
            <div>
                <Skeleton className="skelton_h1" />
            </div>
        )
    }
}
