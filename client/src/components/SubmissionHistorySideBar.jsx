import { useState } from "react";
import { X, Clock, CheckCircle, XCircle, AlertCircle, Menu } from "lucide-react";
import {
  ToggleButton,
  Backdrop,
  SidebarPanel,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  CloseButton,
  SubmissionsList,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
  SubmissionsContainer,
  SubmissionCard,
  StatusRow,
  StatusContainer,
  StatusText,
  TimeText,
  SubmissionId,
  IdLabel,
  BottomRow,
  LanguageTag,
  LanguageIcon,
  LanguageText,
  OutputIndicator,
  OutputDot,
  FooterStats,
  StatsGrid,
  StatItem,
  StatNumber,
  StatLabel,
} from "./styled-components/SubmissionHistory.styles";

const SubmissionHistoryPanel = ({ submissions = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case "SUCCESS":
        return <CheckCircle size={18} color="#22c55e" strokeWidth={2.5} />;
      case "FAILED":
        return <XCircle size={18} color="#ef4444" strokeWidth={2.5} />;
      case "TLE":
        return <Clock size={18} color="#f59e0b" strokeWidth={2.5} />;
      case "PENDING":
        return <Clock size={18} color="#94a3b8" strokeWidth={2.5} />;
      default:
        return <AlertCircle size={18} color="#94a3b8" strokeWidth={2.5} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "SUCCESS":
        return { bg: "rgba(34, 197, 94, 0.15)", border: "rgba(34, 197, 94, 0.4)", text: "#22c55e" };
      case "FAILED":
        return { bg: "rgba(239, 68, 68, 0.15)", border: "rgba(239, 68, 68, 0.4)", text: "#ef4444" };
      case "TLE":
        return { bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.4)", text: "#f59e0b" };
      case "PENDING":
        return { bg: "rgba(148, 163, 184, 0.15)", border: "rgba(148, 163, 184, 0.4)", text: "#94a3b8" };
      default:
        return { bg: "rgba(148, 163, 184, 0.15)", border: "rgba(148, 163, 184, 0.4)", text: "#94a3b8" };
    }
  };

  const getLanguageIcon = (lang) => {
    const langLower = lang?.toLowerCase() || "";
    if (langLower.includes("python")) return "fa-brands fa-python";
    if (langLower.includes("java")) return "fa-brands fa-java";
    if (langLower.includes("go")) return "fa-brands fa-golang";
    if (langLower.includes("c")) return "fa-solid fa-copyright";
    return "fa-solid fa-code";
  };

  const getLanguageColor = (lang) => {
    const langLower = lang?.toLowerCase() || "";
    if (langLower.includes("python")) return "#3776ab";
    if (langLower.includes("java")) return "#f89820";
    if (langLower.includes("go")) return "#00add8";
    if (langLower.includes("c")) return "#a8b9cc";
    return "#94a3b8";
  };

  const getLanguageDisplay = (lang) => {
    const langMap = {
      python: "Python",
      java: "Java",
      golang: "Go",
      "c/cpp": "C/C++",
    };
    return langMap[lang?.toLowerCase()] || lang || "Unknown";
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "Unknown";
    try {
      const date = new Date(timeStr);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);

      if (diff < 60) return "Just now";
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    } catch {
      return timeStr;
    }
  };

  return (
    <>
      {/* TOGGLE BUTTON */}
      <ToggleButton onClick={() => setIsOpen(true)}>
        <Menu size={18} strokeWidth={2.5} />
        History
      </ToggleButton>

      {/* BACKDROP */}
      <Backdrop $isOpen={isOpen} onClick={() => setIsOpen(false)} />

      {/* SIDEBAR PANEL */}
      <SidebarPanel $isOpen={isOpen}>
        {/* HEADER */}
        <Header>
          <div>
            <HeaderTitle>Submission History</HeaderTitle>
            <HeaderSubtitle>
              Your recent: {submissions.length} {submissions.length === 1 ? "submission" : "submissions"}
            </HeaderSubtitle>
          </div>

          <CloseButton onClick={() => setIsOpen(false)}>
            <X size={22} color="#cbd5e1" strokeWidth={2.5} />
          </CloseButton>
        </Header>

        {/* SUBMISSIONS LIST */}
        <SubmissionsList>
          {submissions.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>
                <Menu size={48} color="#64748b" strokeWidth={2} />
              </EmptyStateIcon>
              <EmptyStateTitle>No submissions yet</EmptyStateTitle>
              <EmptyStateText>Your code submissions will appear here</EmptyStateText>
            </EmptyState>
          ) : (
            <SubmissionsContainer>
              {submissions.map((submission, index) => {
                const statusColors = getStatusColor(submission.status);
                const langColor = getLanguageColor(submission.language);
                return (
                  <SubmissionCard key={submission.clientSubmissionId || index}>
                    {/* STATUS & TIME */}
                    <StatusRow>
                      <StatusContainer>
                        {getStatusIcon(submission.status)}
                        <StatusText $color={statusColors.text}>
                          {submission.status || "UNKNOWN"}
                        </StatusText>
                      </StatusContainer>
                      <TimeText>{formatTime(submission.time)}</TimeText>
                    </StatusRow>

                    {/* SUBMISSION ID */}
                    <SubmissionId>
                      <IdLabel>ID: </IdLabel>
                      {submission.clientSubmissionId || "N/A"}
                    </SubmissionId>

                    {/* LANGUAGE TAG WITH ICON */}
                    <BottomRow>
                      <LanguageTag $bg={statusColors.bg} $border={statusColors.border}>
                        <LanguageIcon
                          className={getLanguageIcon(submission.language)}
                          $color={langColor}
                        />
                        <LanguageText>{getLanguageDisplay(submission.language)}</LanguageText>
                      </LanguageTag>

                      {/* OUTPUT INDICATOR */}
                      {submission.stdout && (
                        <OutputIndicator>
                          <OutputDot />
                          Output
                        </OutputIndicator>
                      )}
                    </BottomRow>
                  </SubmissionCard>
                );
              })}
            </SubmissionsContainer>
          )}
        </SubmissionsList>

        {/* FOOTER STATS */}
        {submissions.length > 0 && (
          <FooterStats>
            <StatsGrid>
              <StatItem>
                <StatNumber $color="#22c55e">
                  {submissions.filter((s) => s.status?.toUpperCase() === "SUCCESS").length}
                </StatNumber>
                <StatLabel>Success</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber $color="#ef4444">
                  {submissions.filter((s) => s.status?.toUpperCase() === "FAILED").length}
                </StatNumber>
                <StatLabel>Failed</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber $color="#f59e0b">
                  {submissions.filter((s) => s.status?.toUpperCase() === "TLE").length}
                </StatNumber>
                <StatLabel>TLE</StatLabel>
              </StatItem>
            </StatsGrid>
          </FooterStats>
        )}
      </SidebarPanel>
    </>
  );
};

export default SubmissionHistoryPanel;