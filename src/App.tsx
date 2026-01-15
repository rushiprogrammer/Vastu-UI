import { useState } from 'react';
import {
  // Buttons & Input
  Button,
  HyperlinkButton,
  RepeatButton,
  ToggleButton,
  ToggleSwitch,
  TextInput,
  PasswordBox,
  RichEditBox,
  AutoSuggestBox,
  NumberBox,
  Checkbox,
  Radio,
  Slider,
  RatingControl,
  
  // Date & Time
  DatePicker,
  TimePicker,
  CalendarView,
  
  // Lists & Collections
  ListView,
  GridView,
  ComboBox,
  ListBox,
  
  // Layout & Navigation
  Grid,
  GridItem,
  StackPanel,
  TabView,
  Expander,
  Card,
  SplitView,
  MandalaMandala,
  MandalaCell,
  AppBar,
  CommandBar,
  
  // Progress & Information
  ProgressBar,
  ProgressRing,
  TextBlock,
  ToolTip,
  InfoBadge,
  
  // Media
  Image,
  
  // Pop-ups
  InfoBar,
  
  // Theme
  ThemeToggle,
  FileUpload,
  FAB,
} from './components/index';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('overview');
  const [rating, setRating] = useState(0);
  const [progress, setProgress] = useState(65);
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const [radio, setRadio] = useState('opt1');

  const navItems = [
    { icon: 'dashboard', label: 'Overview' },
    { icon: 'smart_button', label: 'Buttons' },
    { icon: 'calendar_month', label: 'Date & Time' },
    { icon: 'list', label: 'Lists' },
    { icon: 'dashboard_customize', label: 'Layout' },
    { icon: 'show_chart', label: 'Progress' },
    { icon: 'settings', label: 'Advanced' },
  ];

  const commands = [
    { icon: 'save', label: 'Save', onClick: () => alert('Saved!') },
    { icon: 'refresh', label: 'Refresh', onClick: () => setRepeatCount(0) },
    { icon: 'delete', label: 'Delete', onClick: () => alert('Deleted!') },
  ];

  const tabs = [
    { label: 'Tab 1', content: 'Tab 1 content' },
    { label: 'Tab 2', content: 'Tab 2 content' },
    { label: 'Tab 3', content: 'Tab 3 content' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <AppBar currentView={currentView} onNavigate={setCurrentView} />

      <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}>
        <ThemeToggle />
      </div>

      <SplitView displayMode="compact" items={navItems} onNavigate={setCurrentView}>
        {currentView === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card title="🕉️ Vedic UI Kit - 50+ Components">
              <p style={{ color: 'var(--text)', marginBottom: '1rem' }}>
                A comprehensive React component library inspired by WinUI and Vedic design principles. Built with TypeScript, React 19, and Vite.
              </p>
              <ProgressBar value={85} label="Library Completeness" />
            </Card>

            <Card title="Components Added">
              <ul style={{ color: 'var(--text)', lineHeight: 2, paddingLeft: '1.5rem' }}>
                <li>✅ 14 Button & Input Components</li>
                <li>✅ 4 Date & Time Components</li>
                <li>✅ 4 Lists & Collections Components</li>
                <li>✅ 11 Layout & Navigation Components</li>
                <li>✅ 6 Progress & Information Components</li>
                <li>✅ 2 Media & Pop-up Components</li>
              </ul>
            </Card>

            <InfoBar severity="success" title="All systems go!" message="50+ components ready to use" />
          </div>
        )}

        {currentView === 'buttons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card title="Primary Buttons">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </Card>

            <Card title="Secondary Buttons">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Medium</Button>
                <Button variant="secondary" size="lg">Large</Button>
              </div>
            </Card>

            <Card title="Special Buttons">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <HyperlinkButton href="#">Hyperlink</HyperlinkButton>
                <RepeatButton onRepeat={() => setRepeatCount(c => c + 1)}>Repeat ({repeatCount})</RepeatButton>
                <ToggleButton>Toggle Button</ToggleButton>
              </div>
            </Card>

            <Card title="Input Controls">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
                <TextInput label="Text" placeholder="Enter text..." />
                <PasswordBox label="Password" />
                <NumberBox label="Number" min={0} max={100} defaultValue={50} />
                <AutoSuggestBox label="Search" suggestions={[
                  { label: 'Apple', value: 'apple' },
                  { label: 'Apricot', value: 'apricot' },
                ]} />
              </div>
            </Card>

            <Card title="Toggles & Selections">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ToggleSwitch label="Enable notifications" checked={toggleSwitch} onChange={setToggleSwitch} />
                <Checkbox checked={checkbox} onChange={setCheckbox} label="Checkbox" />
                <Radio checked={radio === 'opt1'} onChange={() => setRadio('opt1')} name="demo" value="opt1" label="Radio Option" />
                <Slider label="Slider" min={0} max={100} defaultValue={50} />
                <RatingControl label="Rating" rating={rating} onChange={setRating} />
              </div>
            </Card>

            <Card title="Rich Text Editor">
              <RichEditBox placeholder="Rich text editor..." />
            </Card>
          </div>
        )}

        {currentView === 'date & time' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card title="Date & Time Pickers">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
                <DatePicker label="Select Date" />
                <TimePicker label="Select Time" />
              </div>
            </Card>

            <Card title="Calendar View">
              <CalendarView />
            </Card>
          </div>
        )}

        {currentView === 'lists' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card title="List View">
              <ListView items={[
                { id: 1, label: 'Dashboard', icon: 'dashboard' },
                { id: 2, label: 'Reports', icon: 'description' },
                { id: 3, label: 'Settings', icon: 'settings' },
              ]} />
            </Card>

            <Card title="Grid View">
              <GridView items={[
                { id: 1, label: 'Item 1', icon: 'inventory_2' },
                { id: 2, label: 'Item 2', icon: 'inventory_2' },
                { id: 3, label: 'Item 3', icon: 'inventory_2' },
              ]} columns={3} />
            </Card>

            <Card title="Combo Box">
              <ComboBox options={[
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' },
              ]} />
            </Card>

            <Card title="List Box">
              <ListBox options={[
                { label: 'Item 1', value: 'i1' },
                { label: 'Item 2', value: 'i2' },
                { label: 'Item 3', value: 'i3' },
              ]} />
            </Card>
          </div>
        )}

        {currentView === 'layout' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card title="Tab View">
              <TabView tabs={tabs} />
            </Card>

            <Card title="Expander">
              <Expander title="Click to expand">
                <p style={{ color: 'var(--text)' }}>Expandable content goes here.</p>
              </Expander>
            </Card>

            <Card title="Command Bar">
              <CommandBar commands={commands} />
            </Card>

            <Card title="Grid & Stack Panel">
              <StackPanel direction="horizontal" gap="1rem">
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
              </StackPanel>
            </Card>

            <Card title="Grid Layout">
              <Grid columns={3} gap="1rem">
                <GridItem columnSpan={1}>Item 1</GridItem>
                <GridItem columnSpan={1}>Item 2</GridItem>
                <GridItem columnSpan={1}>Item 3</GridItem>
              </Grid>
            </Card>

            <Card title="Mandala Grid">
              <MandalaMandala size={8}>
                <MandalaCell row={1} col={1} span={4} highlight>Header</MandalaCell>
                <MandalaCell row={1} col={5} span={4}>Nav</MandalaCell>
                <MandalaCell row={2} col={1} span={8}>Main</MandalaCell>
              </MandalaMandala>
            </Card>
          </div>
        )}

        {currentView === 'progress' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card title="Progress Bar">
              <ProgressBar value={progress} label="Loading..." />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button onClick={() => setProgress(Math.max(0, progress - 10))}>-</Button>
                <Button onClick={() => setProgress(Math.min(100, progress + 10))}>+</Button>
              </div>
            </Card>

            <Card title="Progress Ring">
              <ProgressRing value={progress} size={150} />
            </Card>

            <Card title="Text Block">
              <TextBlock variant="title">Title</TextBlock>
              <TextBlock variant="subtitle">Subtitle</TextBlock>
              <TextBlock variant="body">Body text</TextBlock>
              <TextBlock variant="caption">Caption</TextBlock>
            </Card>

            <Card title="Tooltip & Badge">
              <ToolTip content="Hover me!">
                <span style={{ padding: '0.5rem 1rem', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  Tooltip
                </span>
              </ToolTip>
              <div style={{ marginTop: '1rem' }}>
                <InfoBadge value={5}>
                  <span style={{ padding: '0.5rem 1rem', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                    📬 Inbox
                  </span>
                </InfoBadge>
              </div>
            </Card>

            <InfoBar severity="informational" title="Info" message="This is an info bar" />
          </div>
        )}

        {currentView === 'advanced' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card title="File Upload">
              <FileUpload accept=".pdf,.docx,.jpg" maxSize={5242880} />
            </Card>

            <Card title="Image Component">
              <Image src="https://via.placeholder.com/300x200" alt="Sample Image" />
            </Card>
          </div>
        )}
      </SplitView>

      <FAB icon="add" label="Add" onClick={() => alert('FAB Clicked!')} position="bottom-right" />
    </div>
  );
}

export default App;
