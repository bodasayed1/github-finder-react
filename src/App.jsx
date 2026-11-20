import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import SearchForm from "./components/SearchForm.jsx";
import Suggestions from "./components/Suggestions.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import ProfileSkeleton from "./components/ProfileSkeleton.jsx";
import ReposSection from "./components/ReposSection.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import Features from "./components/Features.jsx";
import Footer from "./components/Footer.jsx";
import { fetchProfile, fetchRepos, normalizeError } from "./services/github.js";
import { validateUsername } from "./utils/validateUsername.js";

const initialResult = {
  status: "idle",
  profile: null,
  repos: [],
  error: null,
  reposError: null,
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState("");
  const [request, setRequest] = useState(null);
  const [result, setResult] = useState(initialResult);

  const isLoading = result.status === "loading";

  useEffect(() => {
    if (!request) return;

    const controller = new AbortController();

    async function load() {
      const [profileResult, reposResult] = await Promise.allSettled([
        fetchProfile(request.username, controller.signal),
        fetchRepos(request.username, controller.signal),
      ]);

      if (controller.signal.aborted) return;

      if (profileResult.status === "rejected") {
        setResult({
          ...initialResult,
          status: "error",
          error: normalizeError(profileResult.reason),
        });
        return;
      }

      setResult({
        status: "success",
        profile: profileResult.value,
        repos: reposResult.status === "fulfilled" ? reposResult.value : [],
        error: null,
        reposError:
          reposResult.status === "rejected"
            ? normalizeError(reposResult.reason)
            : null,
      });
    }

    load();

    return () => controller.abort();
  }, [request]);

  function startSearch(username) {
    setResult({ ...initialResult, status: "loading" });
    setRequest((previous) => ({
      username,
      id: previous ? previous.id + 1 : 1,
    }));
  }

  function handleChange(value) {
    setInputValue(value);
    if (validationError) setValidationError("");
  }

  function handleSubmit() {
    if (isLoading) return;
    const message = validateUsername(inputValue);
    setValidationError(message);
    if (message) return;
    startSearch(inputValue.trim());
  }

  function handleSelect(username) {
    if (isLoading) return;
    setValidationError("");
    startSearch(username);
  }

  function handleRetry() {
    if (isLoading || !request) return;
    startSearch(request.username);
  }

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-5 py-12">
      <Header />

      <SearchForm
        value={inputValue}
        error={validationError}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <Suggestions disabled={isLoading} onSelect={handleSelect} />

      <p role="status" className="sr-only">
        {isLoading ? "Loading profile" : ""}
      </p>

      {result.status === "loading" && (
        <>
          <ProfileSkeleton />
          <ReposSection isLoading repos={[]} error={null} onRetry={handleRetry} />
        </>
      )}

      {result.status === "error" && (
        <ErrorMessage error={result.error} onRetry={handleRetry} />
      )}

      {result.status === "success" && (
        <>
          <ProfileCard profile={result.profile} />
          <ReposSection
            isLoading={false}
            repos={result.repos}
            error={result.reposError}
            onRetry={handleRetry}
          />
        </>
      )}

      <Features />
      <Footer />
    </main>
  );
}

export default App;