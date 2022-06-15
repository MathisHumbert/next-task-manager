import uniqid from 'uniqid';

export const handleItemChange = (e, state, setState) => {
  const { value, id } = e.target;

  const newState = state.reduce((acc, curr) => {
    if (curr.id === id) {
      return [...acc, { name: value, id: curr.id }];
    }
    return [...acc, curr];
  }, []);

  setState(newState);
};

export const deleteItem = (id, state, setState) => {
  const newState = state.reduce((acc, curr) => {
    if (curr.id === id) {
      return acc;
    }
    return [...acc, curr];
  }, []);

  setState(newState);
};

export const addItem = (state, setState) =>
  setState([...state, { name: '', id: uniqid() }]);
