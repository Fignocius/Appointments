import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { format } from 'app/util';

import * as Moment from 'moment';
Moment.locale('pt-br');


const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});
export namespace RecipeReviewCard {
    export interface Props {
        classes?: any;
        items: any;
        onDelete: (id:string) => void;
    }
    export interface States {
        expanded: boolean;
    }
}

class RecipeReviewCard extends React.Component<RecipeReviewCard.Props, RecipeReviewCard.States>{
    handleDelete = (id: string) =>{ 
        console.log(id);
        this.props.onDelete(id)};
    render() {
        const {items, classes } = this.props;
        console.log(items);
        return (
            <Grid container spacing={16} justify='flex-start' alignItems='center' >
                {items.map((item) => (<RenderItem item={item} classes={classes} onDel={(id)=>this.handleDelete(id)} />))}
            </Grid>
        );
    }
}
export default withStyles(styles)(RecipeReviewCard);

export class RenderItem extends React.Component<{item: any, classes: any, onDel: (id:string) => void},{expanded: boolean}>{
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    handleDelete = () =>{
        this.props.onDel(this.props.item.id);
    }
    render(){
        const {classes, item} = this.props;
        return (
            <Grid item spacing={16} xs={12}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <IconButton onClick={() => this.handleDelete()}>
                            <DeleteForeverIcon />
                        </IconButton>
                    }
                    action={
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    }
                    title={item.name}
                    subheader={`${Moment(item.date).format(format.EXTPTBR)} - ${item.hour}`}
                />
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{item.description}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
            </Grid>
        );
    }
}