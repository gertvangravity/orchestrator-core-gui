/*
 * Copyright 2019 SURF.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the Licene
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import "./Subscriptions.scss";

import { EuiButton, EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiText } from "@elastic/eui";
import React from "react";

import Explain from "../components/Explain";

interface IProps {}

interface IState {
    showExplanation: boolean;
}

export default class StyleGuide extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            showExplanation: false
        };
    }

    renderExplain() {
        return (
            <section className="explain" onClick={() => this.setState({ showExplanation: true })}>
                <i className="fa fa-question-circle" />
            </section>
        );
    }

    render() {
        const icons = ["Beats", "Cloud", "Logging", "Kibana"];

        const cardNodes = icons.map(function(item, index) {
            return (
                <EuiFlexItem key={index}>
                    <EuiCard
                        icon={<EuiIcon size="xxl" type={`logo${item}`} />}
                        title={`Elastic ${item}`}
                        isDisabled={item === "Kibana" ? true : false}
                        description="Example of a card's description. Stick to one or two sentences."
                        onClick={() => window.alert("Card clicked")}
                    />
                </EuiFlexItem>
            );
        });

        const horizontalCardNodes = icons.map(function(item, index) {
            return (
                <EuiFlexItem key={index}>
                    <EuiCard
                        layout="horizontal"
                        icon={<EuiIcon size="l" type={`logo${item}`} />}
                        title={`Elastic ${item}`}
                        isDisabled={item === "Kibana" ? true : false}
                        description="Example of a card's description. Stick to one or two sentences."
                        onClick={() => window.alert("Card clicked")}
                    />
                </EuiFlexItem>
            );
        });

        return (
            <div className="subscriptions-container">
                <div className="actions">{this.renderExplain()}</div>
                <Explain
                    close={() => this.setState({ showExplanation: false })}
                    render={() => (
                        <React.Fragment>
                            <h1>Help me</h1>
                            <p>Demo for testing help typography</p>
                            <p>
                                The full text search can contain multiple search criteria that will AND-ed together. For
                                example
                                <i>
                                    "customer_id:d253130e-0a11-e511-80d0-005056956c1a status:active tag:IP_PREFIX"
                                </i>{" "}
                                would only return subscriptions matching the supplied <i>customer_id</i>, <i>status</i>{" "}
                                and <i>tag</i>. Due to how full text search works that query could be simplified to:{" "}
                                <i>"d253130e active ip_prefix"</i>.
                            </p>
                        </React.Fragment>
                    )}
                    isVisible={this.state.showExplanation}
                    title="StyleGuide Help"
                />
                <EuiText grow={true}>
                    <h1>Styleguide</h1>
                </EuiText>
                <EuiText grow={true}>
                    <h2>Buttons</h2>
                </EuiText>
                <EuiFlexGroup gutterSize="s" alignItems="center">
                    <EuiFlexItem grow={false}>
                        <EuiButton onClick={() => window.alert("Button clicked")}>Primary</EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton fill onClick={() => window.alert("Button clicked")}>
                            Filled
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton size="s" onClick={() => window.alert("Button clicked")}>
                            Small
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton size="s" fill onClick={() => window.alert("Button clicked")}>
                            Small and filled
                        </EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>

                <EuiFlexGroup gutterSize="s" alignItems="center">
                    <EuiFlexItem grow={false}>
                        <EuiButton color="secondary" onClick={() => window.alert("Button clicked")}>
                            Secondary
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton color="secondary" fill onClick={() => window.alert("Button clicked")}>
                            Filled
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton color="secondary" size="s" onClick={() => window.alert("Button clicked")}>
                            Small
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton color="secondary" size="s" fill onClick={() => window.alert("Button clicked")}>
                            Small and filled
                        </EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>

                <EuiFlexGroup gutterSize="s" alignItems="center">
                    <EuiFlexItem grow={false}>
                        <EuiButton color="warning" onClick={() => window.alert("Button clicked")}>
                            Warning
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton color="warning" fill onClick={() => window.alert("Button clicked")}>
                            Filled
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton color="warning" size="s" onClick={() => window.alert("Button clicked")}>
                            Small
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton color="warning" size="s" fill onClick={() => window.alert("Button clicked")}>
                            Small and filled
                        </EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>

                <EuiFlexGroup gutterSize="s" alignItems="center">
                    <EuiFlexItem grow={false}>
                        <EuiButton color="danger" onClick={() => window.alert("Button clicked")}>
                            Danger
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton color="danger" fill onClick={() => window.alert("Button clicked")}>
                            Filled
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton color="danger" size="s" onClick={() => window.alert("Button clicked")}>
                            Small
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton color="danger" size="s" fill onClick={() => window.alert("Button clicked")}>
                            Small and filled
                        </EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>

                <EuiFlexGroup gutterSize="s" alignItems="center">
                    <EuiFlexItem grow={false}>
                        <EuiButton isDisabled onClick={() => window.alert("Button clicked")}>
                            Disabled
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton isDisabled fill onClick={() => window.alert("Button clicked")}>
                            Filled
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton isDisabled size="s" onClick={() => window.alert("Button clicked")}>
                            Small
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton isDisabled size="s" fill onClick={() => window.alert("Button clicked")}>
                            Small and filled
                        </EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>

                <EuiText>
                    <h2>Cards</h2>
                </EuiText>
                <EuiFlexGroup gutterSize="l">{cardNodes}</EuiFlexGroup>
                <EuiFlexGroup gutterSize="l">{horizontalCardNodes}</EuiFlexGroup>

                <EuiText grow={true}>
                    <h2>Typography: Heading two</h2>
                    <p>
                        Far out in the uncharted backwaters of the{" "}
                        <a href="https://www.goodreads.com/quotes/54481-far-out-in-the-uncharted-backwaters-of-the-unfashionable-end">
                            unfashionable
                        </a>{" "}
                        end of the western spiral arm of the Galaxy lies a small unregarded yellow sun. When suddenly
                        some wild JavaScript code appeared! <code>const whoa = &quot;!&quot;</code>
                    </p>
                    <pre>
                        <code>const completelyUnexpected = &quot;the audacity!&quot;;</code>
                    </pre>
                    0<p>That was close.</p>
                    <blockquote>
                        <p>
                            I&apos;ve seen things you people wouldn&apos;t believe. Attack ships on fire off the
                            shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those
                            moments will be lost in time, like tears in rain. Time to die.
                        </p>
                    </blockquote>
                    <p>
                        Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant
                        little blue green planet whose ape- descended life forms are so amazingly primitive that they
                        still think digital watches are a pretty neat idea.
                    </p>
                    <ul>
                        <li>List item one</li>
                        <li>List item two</li>
                        <li>Dolphins</li>
                    </ul>
                    <p>
                        This planet has - or rather had - a problem, which was this: most of the people living on it
                        were unhappy for pretty much of the time. Many solutions were suggested for this problem, but
                        most of these were largely concerned with the movements of small green pieces of paper, which is
                        odd because on the whole it was not the small green pieces of paper that were unhappy.
                    </p>
                    <h3>This is Heading Tree</h3>
                    <ol>
                        <li>Number one</li>
                        <li>Number two</li>
                        <li>Dolphins again</li>
                    </ol>
                    <p>
                        But the dog wasn&rsquo;t lazy, it was just practicing mindfulness, so it had a greater sense of
                        life-satisfaction than that fox with all its silly jumping.
                    </p>
                </EuiText>
            </div>
        );
    }
}

// StyleGuide.contextType = ApplicationContext;
