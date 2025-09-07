import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";

export const HelpModal = () => {
  const handleCancel = () => {
    shopify.modal.hide("HelpModal");
  };
  
  const email = "support@auremist.com"
  const whatsapp = "+212638278510"
  const telegram = "https://t.me/MrOverSkilled"
  
  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    shopify.toast.show("Email copied!");
  };
  
  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsapp.replace('+', '')}`, '_blank');
  };
  
  const openTelegram = () => {
    window.open(telegram, '_blank');
  };
  
  return (
    <>
      <Modal id="HelpModal">
        <div style={{ padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '20px', 
              fontWeight: '600',
              color: '#202223'
            }}>
              Get Support
            </h2>
            <p style={{ 
              margin: '0', 
              fontSize: '14px', 
              color: '#6D7175'
            }}>
              Choose how you'd like to contact us
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '16px 20px',
              border: '1px solid #E1E3E5',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '20px', 
                  backgroundColor: '#E3F2FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  ✉️
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#202223' }}>
                    Email
                  </div>
                  <div style={{ fontSize: '13px', color: '#6D7175' }}>
                    {email}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => window.open(`mailto:${email}`, '_blank')}
                  style={{ 
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '500',
                    border: '1px solid #2C6ECB',
                    borderRadius: '6px',
                    backgroundColor: '#2C6ECB',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  Send
                </button>
                <button 
                  onClick={copyEmail}
                  style={{ 
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: '500',
                    border: '1px solid #C9CCCF',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    color: '#202223',
                    cursor: 'pointer'
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '16px 20px',
              border: '1px solid #E1E3E5',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '20px', 
                  backgroundColor: '#E8F5E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  📱
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#202223' }}>
                    WhatsApp
                  </div>
                  <div style={{ fontSize: '13px', color: '#6D7175' }}>
                    {whatsapp}
                  </div>
                </div>
              </div>
              <button 
                onClick={openWhatsApp}
                style={{ 
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  border: '1px solid #25D366',
                  borderRadius: '6px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                Chat
              </button>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '16px 20px',
              border: '1px solid #E1E3E5',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '20px', 
                  backgroundColor: '#E3F2FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  💬
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#202223' }}>
                    Telegram
                  </div>
                  <div style={{ fontSize: '13px', color: '#6D7175' }}>
                    @MrOverSkilled
                  </div>
                </div>
              </div>
              <button 
                onClick={openTelegram}
                style={{ 
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  border: '1px solid #0088cc',
                  borderRadius: '6px',
                  backgroundColor: '#0088cc',
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                Open
              </button>
            </div>
          </div>
        </div>
        
        <TitleBar title="Contact Support">
        </TitleBar>
      </Modal>
    </>
  );
};