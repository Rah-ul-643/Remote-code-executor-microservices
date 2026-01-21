import styled from "styled-components";

export const ToggleButton = styled.button`
  position: fixed;
  top: 15px;
  right: 2px;
  z-index: 999;
  padding: 11px 10px;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.25);
  color: #f1c410ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(51, 65, 85, 0.95);
    border-color: rgba(148, 163, 184, 0.4);
    transform: translateY(-1px);
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
  transition: opacity 0.25s ease-in-out;
  z-index: 9998;
`;

export const SidebarPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 420px;
  max-width: 90vw;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  border-right: 1px solid rgba(148, 163, 184, 0.15);
  transform: ${(props) => (props.$isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  box-shadow: 12px 0 32px rgba(0, 0, 0, 0.5);
`;

export const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  background: rgba(30, 41, 59, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.h2`
  color: #f8fafc;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const HeaderSubtitle = styled.p`
  color: #cbd5e1;
  margin: 6px 0 0 0;
  font-size: 13px;
  font-weight: 500;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(148, 163, 184, 0.15);
  }
`;

export const SubmissionsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const EmptyState = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #64748b;
  text-align: center;
  padding: 40px 20px;
`;

export const EmptyStateIcon = styled.div`
  padding: 24px;
  border-radius: 50%;
  background: rgba(100, 116, 139, 0.12);
  margin-bottom: 20px;
`;

export const EmptyStateTitle = styled.p`
  margin: 0 0 8px 0;
  font-size: 17px;
  font-weight: 600;
  color: #cbd5e1;
`;

export const EmptyStateText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #94a3b8;
`;

export const SubmissionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SubmissionCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.15);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(51, 65, 85, 0.6);
    border-color: rgba(148, 163, 184, 0.3);
    transform: translateX(4px);
  }
`;

export const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const StatusContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const StatusText = styled.span`
  color: ${(props) => props.$color};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TimeText = styled.span`
  font-size: 12px;
  color: #cbd5e1;
  font-weight: 500;
`;

export const SubmissionId = styled.div`
  font-size: 11px;
  color: #94a3b8;
  font-family: monospace;
  margin-bottom: 12px;
  padding: 8px 10px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 6px;
  word-break: break-all;
  line-height: 1.5;
  border: 1px solid rgba(148, 163, 184, 0.1);
`;

export const IdLabel = styled.span`
  color: #64748b;
  font-weight: 600;
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LanguageTag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  border-radius: 8px;
  background: ${(props) => props.$bg};
  border: 1px solid ${(props) => props.$border};
`;

export const LanguageIcon = styled.i`
  color: ${(props) => props.$color};
  font-size: 16px;
`;

export const LanguageText = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #f8fafc;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const OutputIndicator = styled.span`
  font-size: 11px;
  color: #22c55e;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  padding: 4px 8px;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 6px;
`;

export const OutputDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
`;

export const FooterStats = styled.div`
  padding: 20px 24px;
  border-top: 1px solid rgba(148, 163, 184, 0.15);
  background: rgba(30, 41, 59, 0.4);
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${(props) => props.$color};
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 11px;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
`;