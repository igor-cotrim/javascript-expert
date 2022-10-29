export default class Shipment {
  update({ id, userName }) {
    console.log(
      `[${id}]: [shiment] will pack the user's order to [${userName}]`
    );
  }
}
