import '@testing-library/jest-dom/extend-expect';

const localStorageMock = (function () {
    let store = {};
  
    return {
      getItem(key) {
        return store[key] || JSON.stringify(null);
      },
  
      setItem(key, value) {
        store[key] = value;
      },
  
      clear() {
        store = {};
      },
  
      removeItem(key) {
        delete store[key];
      },
  
      getAll() {
        return store;
      },
    };
  })();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  const mockedUsedNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
     ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }));
  const mockedDispatch = jest.fn();
  jest.mock('react-redux', ()=>({
    ...jest.requireActual('react-redux'),
    useDispatch:()=>mockedDispatch,
  }))
  const mockedSelector = jest.fn();
  jest.mock('react-redux', ()=>({
    ...jest.requireActual('react-redux'),
    useSelector: ()=>mockedSelector,
  }))