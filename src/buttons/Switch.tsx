const Switch = ({ isEnabled, setIsEnabled }: { isEnabled: boolean, setIsEnabled: (isEnabled: boolean) => void }) => {

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div 
        className="switch"
        onClick={handleToggle}
        style={{
          width: '60px',
          height: '30px',
          backgroundColor: isEnabled ? '#000' : '#ccc',
          borderRadius: '15px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          border: '2px solid #000'
        }}
      >
        <div 
          className="switch-handle"
          style={{
            width: '22px',
            height: '22px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: isEnabled ? '32px' : '2px',
            transition: 'left 0.3s ease',
            border: '1px solid #000'
          }}
        />
      </div>
      
    </div>
  );
};

export default Switch;