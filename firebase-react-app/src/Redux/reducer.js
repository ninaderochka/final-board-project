import shortId from "shortid";
//actions
export function addList() {
  return {
    type: "ADD_LIST",
  };
}

export function deleteList(id) {
  return {
    type: "DELETE_LIST",
    payload: { id },
  };
}

export function changeTitle(id, title) {
  return {
    type: "CHANGE_TITLE",
    payload: { id, title },
  };
}

export function addCard(listId) {
  return {
    type: "ADD_CARD",
    payload: { listId },
  };
}
export function deleteCard(listId, cardId) {
  return {
    type: "DELETE_CARD",
    payload: { listId, cardId },
  };
}

export function editCard(listId, cardId, text) {
  return {
    type: "EDIT_CARD",
    payload: { listId, cardId, text },
  };
}
const initialState = [
  {
    id: shortId.generate(),
    title: "",
    cards: [{ id: shortId.generate(), text: "" }],
  },
];
export const boardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_LIST":
      return [
        ...state,
        {
          id: shortId.generate(),
          title: "",
          cards: [{ id: shortId.generate(), text: "" }],
        },
      ];

    case "CHANGE_TITLE": {
      const newList = state.map((list) => {
        if (list.id === payload.id) {
          return {
            ...list,
            title: payload.title,
          };
        }
        return list;
      });
      return newList;
    }

    case "DELETE_LIST": {
      const newList = state.filter((e) => e.id !== payload.id);
      console.log(newList);
      return newList;
    }
    case "ADD_CARD": {
      const newList = state.map((list) => {
        if (list.id === payload.listId) {
          return {
            ...list,
            cards: [...list.cards, { id: shortId.generate(), text: "" }],
          };
        }
        return list;
      });
      return newList;
    }

    case "DELETE_CARD": {
      const newList = state.map((list) => {
        if (list.id === payload.listId) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== payload.cardId),
          };
        }
        return list;
      });
      return newList;
    }
    case "EDIT_CARD": {
      const newList = state.map((list) => {
        if (list.id === payload.listId) {
          return {
            ...list,
            cards: list.cards.map((card) => {
              if (card.id === payload.cardId) {
                return { ...card, text: payload.text };
              }
              return card;
            }),
          };
        }
        return list;
      });
      return newList;
    }
    default:
      return state;
  }
};

export default boardReducer;
