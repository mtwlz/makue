import React, { useState } from 'react';
import './styles/global.css';
import { ThemeContext, useTheme } from './contexts/ThemeContext';
import Button from './components/Button';
import Card from './components/Card';
import Toggle from './components/Toggle';

// Modals
import Modal from './components/Modal';
import { useModalContext } from './contexts/ModalContext';

// Toasts
import { useToastContext } from './contexts/ToastContext';
import ToastContainer from './components/ToastContainer';
import Icon from './components/Icon';
import Checkbox from './components/Checkbox';
import TextInput from './components/TextInput';

const messages = [
  {
    id: 'regular',
    context: 'important',
    message: 'Simple, but effective.'
  },
  {
    id: 'progress',
    context: 'primary',
    message: 'This toast has a progress bar!',
  },
  {
    id: 'title',
    context: 'danger',
    message: 'This toast has a title!',
  },
  {
    id: 'sticky',
    context: 'success',
    message: `This toast won't go away until you click it.`,
  },
  {
    id: 'icon',
    context: 'caution',
    message: 'Thanks Font Awesome!',
  },
  {
    id: 'kids',
    context: 'secondary',
    message: 'Are you sure you want to delete this?',
  },
];

function App() {
  
  // Theme
  const { theme, darkMode, toggleDarkMode } = React.useContext(ThemeContext);
  const { switchTheme } = useTheme();
  const themes = ['classic', 'pastel', 'dark', 'earthy', 'vibrant', 'monochrome', 'highcontrast', 'tropical'];
  
  const cycleTheme = () => {
    const theTheme = theme.replace('theme-', '');
    const currentIndex = themes.indexOf(theTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    switchTheme('theme-' + themes[nextIndex]);
  };
  
  // Modal test functions
  const { openModal, closeModal } = useModalContext();

  const handleOpenModal = () => {
    openModal({
      title: 'Important Information',
      context: 'danger',
      content: <p>This is some important content inside the modal.</p>,
      onOkay: () => {
        alert('Okay clicked!');
        closeModal();
      },
      onCancel: () => closeModal(),
      icon: {
        name: 'exclamation-triangle',
        bounce: true
      }
    });
  };

  // Toast test functions
  const { addToast } = useToastContext();
  const handleMakeToast = (testId) => {
    const testResponse = () => addToast({
      message: 'You pressed a button.',
      context: 'success',
      duration: 5000,
      progressBar: true
    });

    let m = messages.find((m) => m.id === testId);
    addToast({
      title: testId === 'title' || testId === 'kids' ? 'Important Message' : undefined,
      message: m.message,
      context: m.context,
      icon: testId === 'icon' ? 'exclamation-triangle' : undefined,
      duration: testId === 'sticky' || testId === 'kids' ? undefined : 5000,
      progressBar: testId === 'progress' ? true : false,
      children: testId !== 'kids' ? undefined : (
        <div style={{display: 'flex', gap: '5px'}}>
          <Button context="danger" onClick={testResponse}>
            Delete
          </Button>
          <Button context="secondary" onClick={testResponse}>
            Cancel
          </Button>
        </div>
      )
    });
  };

  // Toggle test functions
  const [disableAlt, setDisableAlt] = useState(false);
  const handleDarkToggle = (toggled) => {
    toggleDarkMode(toggled);
    setDisableAlt(toggled);
  };

  // Button test function
  const [buttonState, setButtonState] = useState('None');
  const buttonClick = (context) => setButtonState(context);

  // Text input test function
  const [textInputValue1, setTextInputValue1] = useState('');
  const [textInputValue2, setTextInputValue2] = useState('');
  const [textInputValue3, setTextInputValue3] = useState('');
  const [textInputValue4, setTextInputValue4] = useState('');
  const [textInputValue5, setTextInputValue5] = useState('');

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div style={{ padding: '20px' }}>
        <Card>
          <h2>Themeing</h2>
          <p>A description about themes</p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
            <Button context="primary" onClick={cycleTheme}>
                {theme}
            </Button>
            <br />
            <Toggle 
                labelOn="Dark" 
                labelOff="Light" 
                context="secondary" 
                value={darkMode}
                onToggle={handleDarkToggle}
            />
          </div>
        </Card>
        <Card>
          <h2>Cards</h2>
          <Card>
            <h3>Card Title</h3>
            <p>This is a simple card component.</p>
          </Card>
        </Card>
        <Card>
          <h2>Modals</h2>
          <Button onClick={handleOpenModal}>Open Modal</Button>
        </Card>
        <Card>
          <h2>Icons</h2>
          <p>Brought to you by the fine folks at Font Awesome.</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '28px' }}>
            <Icon icon='check' context="success"/>
            <Icon icon='times' context="danger" beat />
            <Icon icon='bell' context="caution" shake />
            <Icon icon='info' context="info" />
            <Icon icon='spinner' spin />
            <Icon icon='cog' context="secondary" fade />
            <Icon icon='basketball' context="important" bounce />
            <Icon icon='camera-rotate' context="primary" flip />
          </div>
        </Card>
        <Card>
          <h2>Toasts</h2>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            <Button onClick={() => handleMakeToast('regular')} context='important'>Make Toast</Button>
            <Button onClick={() => handleMakeToast('progress')} context='primary'>...with a progress bar</Button>
            <Button onClick={() => handleMakeToast('title')} context='danger'>...with a title</Button>
            <Button onClick={() => handleMakeToast('sticky')} context='success'>...that doesn't leave</Button>
            <Button onClick={() => handleMakeToast('kids')} context='secondary'>...that has children.</Button>
            <Button onClick={() => handleMakeToast('icon')} context='caution'>
              ...with a fancy icon <Icon icon='exclamation-triangle' />
            </Button>
          </div>
        </Card>
        <Card>
          <h2>Buttons</h2>
          <p>Button clicked: {buttonState}</p>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            <Button context="primary" onClick={() => buttonClick('Primary')}>
              Primary
            </Button>
            <Button context="secondary" onClick={() => buttonClick('Secondary')}>
              Secondary
            </Button>
            <Button context="success" onClick={() => buttonClick('Success')}>
              Success
            </Button>
            <Button context="danger" onClick={() => buttonClick('Danger')}>
              Danger
            </Button>
            <Button context="caution" onClick={() => buttonClick('Caution')}>
              Caution
            </Button>
            <Button context="info" onClick={() => buttonClick('Info')}>
              Info
            </Button>
            <Button context="important" onClick={() => buttonClick('Important')}>
              Important
            </Button>
          </div>
        </Card>
        <Card>
          <h2>Toggles</h2>
          <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
            <Toggle 
              context="primary" 
              onToggle={() => console.log('Primary toggled!')}
            />
            <Toggle
              context="secondary"
              onToggle={() => console.log('Secondary toggled!')}
            />
            <Toggle 
              context="danger" 
              onToggle={() => console.log('Danger toggled!')}
            />
            <Toggle 
              context="success" 
              disabled={disableAlt} 
              onToggle={() => console.log('Alt toggled!')}
            />
            <Toggle
              context="info"
              onToggle={() => console.log('Info toggled!')}
            />
            <Toggle
              context="caution"
              onToggle={() => console.log('Caution toggled!')}
            />
            <Toggle
              context="important"
              onToggle={() => console.log('Important toggled!')}
            />
          </div>
        </Card>
        <Card>
          <h2>Checkboxes</h2>
          <Checkbox
            label="Primary"
            context="primary"
          />
          <br />
          <Checkbox
            label="Secondary"
            context="secondary"
          />
          <br />
          <Checkbox
            label="Success"
            context="success"
          />
          <br />
          <Checkbox
            label="Danger (disabled example)"
            context="danger"
            disabled
          />
          <br />
          <Checkbox
            label="Caution"
            context="caution"
          />
          <br />
          <Checkbox
            label="Info"
            context="info"
          />
          <br />
          <Checkbox
            label="Important"
            context="important"
          />
        </Card>
        <Card>
          <h2>Inputs</h2>
          <Card>
            <h3>Text Inputs</h3>
            <TextInput
              value={textInputValue1}
              onChange={setTextInputValue1}
              placeholder="A regular text input."
              context="primary"
            />
            <TextInput
              value={textInputValue2}
              onChange={setTextInputValue2}
              placeholder="A text input with a label."
              context="primary"
              label="This is what the label looks like."
            />
            <TextInput
              value={textInputValue3}
              onChange={setTextInputValue3}
              placeholder="This one has an icon."
              
              icon="question-circle"
            />
            <TextInput
              value={textInputValue4}
              onChange={setTextInputValue4}
              placeholder="This one validates text."
              context="primary"
              label="Between 5 and 25 chars"
              error={textInputValue4 !== '' && (textInputValue4.length > 25 || textInputValue4.length <= 4)}
              success={textInputValue4.length > 4}
              validText="Some error or success message."
            />
          </Card>
        </Card>
        <br /><br />
        <Modal />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
