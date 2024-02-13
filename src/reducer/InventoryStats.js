const initialState = {
  data: [],
  status: {
    code: -1,
    mssg: "Loading",
  },
};

const FinalInventoryData = (state = initialState, action) => {
  switch (action.type) {
    case "InventoryData":
      return {
        data: action.payload.data,
        status:
        {
            code: action.payload.code,
            mssg: action.payload.mssg
        }
      };
    default:
      return state;
  }
};

export default FinalInventoryData;
