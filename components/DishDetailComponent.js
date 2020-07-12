import React, { useState, useRef } from 'react';
import {View, Text, ScrollView, FlatList, Button, Modal, StyleSheet, Alert, PanResponder} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import postFavorite from '../actions/postFavorite';
import postComment from '../actions/postComment';
import { connect } from 'react-redux';

const DishDetail = props => {
    const { navigation, dishes, comments, favorites } = props;
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentMessage, setCommentMessage] = useState('');
    const [rating, setRating] = useState(1);
    const dishId = navigation.getParam('dishId', '');
    const currentDish = dishes.dishes.find(dish => dish.id === dishId);
    const viewRef = useRef(null);

    const markFavorite = dishId => {
        props.postFavorite(dishId);
    };

    const toggleModal = () => {
        setShowCommentModal(!showCommentModal);
    };

    const handleClosing = () => {
        toggleModal();
        resetForm();
    };

    const handleSubmit = () => {
        props.postComment(dishId, rating, commentAuthor, commentMessage);
       handleClosing();
    };

    const resetForm = () => {
        setCommentAuthor(null);
        setCommentMessage(null);
        setRating(1);
    };

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        return dx < -200;
    };

    const panResponder = PanResponder.create({
       onStartShouldSetPanResponder: (event, gestureState) => {
         return true;
       },
        onPanResponderGrant: () => {
           viewRef.current.rubberBand(1000)
               .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (event, gestureState) => {
          if (recognizeDrag(gestureState)) {
              Alert.alert(
                  'Add to favorites?',
                  `Are you sure you wish to add ${currentDish.name} to your favorites?`,
                  [
                      {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel pressed'),
                          style: 'cancel',
                      },
                      {
                          text: 'OK',
                          onPress: () => favorites.some(item => item === dishId) ? console.log('Already favorite') : markFavorite(dishId),
                      },
                  ],
                  { cancelable: false }
              )
          }

          return true;
        },
    });

    if (currentDish) {
        const isFavorite = favorites.some(item => item === dishId);
        return (
            <ScrollView>
                <Animatable.View
                    animation="fadeInDown"
                    ref={viewRef}
                    duration={2000}
                    delay={1000}
                    {...panResponder.panHandlers}
                >
                    <Card
                        featuredTitle={currentDish.name}
                        image={{ uri: `${baseUrl}/${currentDish.image}` }}
                    >
                        <Text style={{ margin: 10 }}>
                            {currentDish.description}
                        </Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
                            <Icon
                                style={{ flex: 1 }}
                                raised={true}
                                reverse={true}
                                name={isFavorite ? 'heart' : 'heart-o'}
                                type="font-awesome"
                                color="#f50"
                                onPress={() => isFavorite ? console.log('Already favorite') : markFavorite(dishId)}
                            />
                            <Icon
                                style={{ flex: 1 }}
                                raised={true}
                                reverse={true}
                                name="pencil"
                                type="font-awesome"
                                color="#512DA8"
                                onPress={toggleModal}
                            />
                        </View>
                    </Card>
                    <Comments comments={comments.comments.filter(comment => comment.dishId === dishId)} />
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={showCommentModal}
                        onDismiss={() => {toggleModal(); resetForm()}}
                        onRequestClose={() => {toggleModal(); resetForm()}}
                    >
                        <View style={styles.modal}>
                            <Rating
                                type="star"
                                startingValue={rating}
                                showRating={true}
                            />
                           <Input
                               placeholder="Author"
                               leftIcon={<Icon
                                   name="user-o"
                                   type="font-awesome"
                                   size={24}
                                   color="black"
                               />}
                               onChangeText={value => setCommentAuthor(value)}
                           />
                           <Input
                               placeholder="Comment"
                               leftIcon={<Icon
                                   name="comment-o"
                                   type="font-awesome"
                                   size={24}
                                   color="black"
                               />}
                               onChangeText={value => setCommentMessage(value)}
                           />
                           <View style={styles.submitButton}>
                               <Button
                                   onPress={handleSubmit}
                                   color="#512DA8"
                                   title="Submit"
                               />
                           </View>
                        <Button
                               onPress={handleClosing}
                               color="#808080"
                               title="Close"
                           />
                        </View>
                    </Modal>
                </Animatable.View>

            </ScrollView>
        );
    } else {
        return( <View></View>)
    }
};

const Comments = props => {
    const { comments } = props;

    const renderItem = ({ item, index }) => (
        <View key={index} style={{ margin: 10 }}>
            <Text style={{ fontSize: 14 }}>{item.comment}</Text>
            <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
            <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
        </View>
    );

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    )
};

DishDetail.navigationOptions = {
    title: 'Dish Details',
};

const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
});


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    submitButton: {
        marginBottom: 10
    }

});

export default connect(
    mapStateToProps,
    { postFavorite, postComment }
)(DishDetail);
