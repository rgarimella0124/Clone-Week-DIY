import React from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View
} from "react-native";

const CIRCLE_RADIUS = 36;
const Window = Dimensions.get("window");

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const pan1 = new Animated.ValueXY();
    const pan2 = new Animated.ValueXY();
    const pan3 = new Animated.ValueXY();

    this.state = {
      dropZoneValues: null,
      pan1,
      pan2,
      pan3,
      showPan1: true,
      showPan2: true,
      showPan3: true
    };

    this.panResponder1 = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan1.x, dy: pan1.y }]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          this.setState({ showPan1: false });
        } else {
          Animated.spring(pan1, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });

    this.panResponder2 = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan2.x, dy: pan2.y }]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          this.setState({ showPan2: false });
        } else {
          Animated.spring(pan2, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });

    this.panResponder3 = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan3.x, dy: pan3.y }]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          this.setState({ showPan3: false });
        } else {
          Animated.spring(pan3, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });

    this.setDropZoneValues = this.setDropZoneValues.bind(this);
  }

  setDropZoneValues(event) {
    this.setState({ dropZoneValues: event.nativeEvent.layout });
  }

  isDropZone(gesture) {
    const { dropZoneValues: dz } = this.state;

    return (
      gesture.moveY > dz.y &&
      gesture.moveY < dz.y + dz.height &&
      gesture.moveX > dz.x &&
      gesture.moveX < dz.x + dz.width
    );
  }

  render() {
    const { pan1, pan2, pan3, showPan1, showPan2, showPan3 } = this.state;

    return (
      <View style={styles.mainContainer}>
        <View onLayout={this.setDropZoneValues} style={styles.dropZone} />

        <View style={styles.draggableContainer}>
          <View style={styles.draggableContainerItem}>
            {showPan1 && (
              <Animated.View
                {...this.panResponder1.panHandlers}
                style={[pan1.getLayout(), styles.square]}
              />
            )}
          </View>
          <View style={styles.draggableContainerItem}>
            {showPan2 && (
              <Animated.View
                {...this.panResponder2.panHandlers}
                style={[pan2.getLayout(), styles.square]}
              />
            )}
          </View>
          <View style={styles.draggableContainerItem}>
            {showPan3 && (
              <Animated.View
                {...this.panResponder3.panHandlers}
                style={[pan3.getLayout(), styles.square]}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#c0c5c1",
    flex: 1,
    justifyContent: "center"
  },
  dropZone: {
    alignSelf: "center",
    backgroundColor: "#7d8491",
    height: Math.ceil(Window.width / 2),
    paddingHorizontal: 20,
    width: Math.ceil(Window.width / 2)
  },
  draggableContainer: {
    backgroundColor: "#93b7be",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 40,
    paddingBottom: 60,
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  draggableContainerItem: {
    backgroundColor: "#f00",
    height: CIRCLE_RADIUS,
    width: CIRCLE_RADIUS
  },
  square: {
    backgroundColor: "#2c666e",
    height: CIRCLE_RADIUS,
    width: CIRCLE_RADIUS
  }
});
